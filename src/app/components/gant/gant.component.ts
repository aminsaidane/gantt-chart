import { Component, AfterViewInit } from '@angular/core';
import { DateHelper, Gantt } from '@bryntum/gantt';
import { GanttDataService } from '../../services/gantt-data.service';
import type { GeneralTab, TaskModel } from '@bryntum/gantt';
import { GanttTask } from '../../services/gantt-data.service';
@Component({
  selector: 'app-gant',
  standalone: true,
  templateUrl: './gant.component.html',
  styleUrls: ['./gant.component.css'], // fixed typo styleUrl -> styleUrls
})
export class GanttComponent implements AfterViewInit {
  private gantt!: Gantt;

  tasks: any[] = [];
  dependencies: any[] = [];
  resources: any[] = [];
  assignments: any[] = [];

  constructor(private ganttDataService: GanttDataService) {}

  ngAfterViewInit(): void {
    this.ganttDataService.getGanttData().subscribe({
      next: (res) => {
        const { tasks, dependencies, resources, assignments } = res.data;

        this.tasks = tasks.map(task => ({
          ...task,
          id: task._id, // Use _id as id for Gantt UI
          parentId: task.parentId ? String(task.parentId) : undefined,
          startDate: new Date(task.startDate),
          endDate: new Date(task.endDate),
        }));

        this.dependencies = dependencies.map(dep => ({
          ...dep,
          id: dep._id,
          fromEvent: String(dep.fromEvent),
          toEvent: String(dep.toEvent),
        }));

        this.resources = resources.map(resource => ({
          ...resource,
          id: resource._id,
        }));

        this.assignments = assignments.map(assignment => ({
          ...assignment,
          id: assignment._id,
          event: String(assignment.event),
          resource: String(assignment.resource),
        }));
        
        this.initializeGantt();
        console.log(this.tasks)
      },
      error: (err) => {
        console.error('Failed to load Gantt data:', err);
      },
    });
  }

  private initializeGantt() {
    this.gantt = new Gantt({
      appendTo: 'gantt-container',
      columns: [
        { type: 'wbs' },
        { type: 'name' },
        { type: 'startdate' },
        { type: 'duration' },
        { type: 'resourceassignment' },
        { type: 'percentdone', mode: 'circle', width: 70 },
      ],
      features: {
        dependencies: true,
        taskEdit:{
          items: {
      general: {
        items: {
          
            requiredProfile: {
                  type: 'text',
                  name: 'requiredProfile',
                  label: 'Required Profile'
                },
                businessUnit: {
                  type: 'combo',
                  name: 'businessUnit',
                  label: 'Business Unit',
                  items: [
                    'Maintenance',
                    'Distribution',
                    'Metering',
                    'Safety & Compliance',
                    'Operations',
                    'Technical Support'
                  ],
                  editable: false
                },
                priority: {
                  type: 'combo',
                  name: 'priority',
                  label: 'Priority',
                  items:[
                    'low',
                    'medium',
                    'high'
                  ]
                },
                requiredCompetences: {
                  type: 'text',
                  name: 'requiredCompetences',
                  label: 'Required Competences (seperate by comma)',
                  placeholder: 'Add competence...'
                },
                requiredCertifications: {
                  type: 'text',
                  name: 'requiredCertifications',
                  label: 'Required Certifications (seperate by comma)',
                  placeholder: 'Add certification...'
                },
                requiredFormations: {
                  type: 'text',
                  name: 'requiredFormations',
                  label: 'Required Formations (seperate by comma)',
                  placeholder: 'Add formation...'
                },
                
        }
      }
    }
        },
      },
      project: {
        autoSetConstraints: true,
        startDate: '2025-01-01',
        calendar: 'general',
        hoursPerDay: 24,
        daysPerWeek: 5,
        daysPerMonth: 20,
        stm: {
          autoRecord: true,
        },
        tasksData: this.tasks,
        resources: this.resources,
        assignmentsData: this.assignments,
        dependenciesData: this.dependencies,
        taskStore: {
          tree: true,
          transformFlatData: true,
        },
        dependencyStore: {
          tree: true,
        },
      },
      tbar: [
        {
          type: 'button',
          text: 'Add Task',
          icon: 'b-fa b-fa-plus',
          onAction: () => {
            const selected = this.gantt.selectedRecord;
            // Use selected or fallback to root node for parent
            const parentTask =
              selected && !selected.isLeaf
                ? selected
                : selected?.parent ?? this.gantt.project.taskStore.rootNode;

            const now = new Date();
            const startDate = now.toISOString().split('T')[0];
            const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0]; // +1 day

            // Create new task payload with parentId as string
            const newTaskPayload = {
              name: 'New Task',
              duration: 1,
              percentDone: 0,
              startDate,
              endDate,
              parentId: String(parentTask.id),
              expanded: true,
            };

            this.ganttDataService.addTask(newTaskPayload).subscribe({
              next: (savedTask) => {
                const newTask = parentTask.appendChild({
                  ...savedTask,
                  id: savedTask._id,
                  startDate: new Date(savedTask.startDate),
                  endDate: new Date(savedTask.endDate),
                }) as any;

                this.gantt.scrollRowIntoView(newTask);
                this.gantt.editTask(newTask)
              },
              error: (err) => {
                console.error('Failed to add task:', err);
                alert('Failed to add task. Check the console for more details.');
              },
            });
            
          },
        },
        {
          type: 'button',
          text: 'Delete Task',
          icon: 'b-fa b-fa-trash',
          onAction: () => {
            const selected = this.gantt.selectedRecord as any;
            if (!selected) {
              alert('Please select a task to delete.');
              return;
            }

            if (
              confirm(`Are you sure you want to delete task "${selected.name}"?`)
            ) {
              console.log(String(selected.id))
              this.ganttDataService.deleteTask(String(selected.id)).subscribe({
                next: () => {
                  selected.remove(); // Remove from UI
                  alert('Task deleted successfully.');
                },
                error: (err) => {
                  console.error('Failed to delete task:', err);
                  alert('Failed to delete task. Check console for details.');
                },
              });
            }
          },
        },
        {
          type: 'button',
          text: 'Edit Task',
          icon: 'b-fa b-fa-pen',
          onAction: () => {
            const selected = this.gantt.selectedRecord as any;
            if (selected) {
              this.gantt.editTask(selected);
            } else {
              alert('Please select a task to edit.');
            }
          },
        },
        {
          type: 'button',
          text: 'Undo',
          icon: 'b-fa b-fa-undo',
          onAction: () =>
            this.gantt.project.stm.canUndo && this.gantt.project.stm.undo(),
        },
        {
          type: 'button',
          text: 'Redo',
          icon: 'b-fa b-fa-redo',
          onAction: () =>
            this.gantt.project.stm.canRedo && this.gantt.project.stm.redo(),
        },
      ],
    });

    this.gantt.on('taskEdit', ({ record }: { record: TaskModel }) => {
      console.log('Task edit starting:', record.name);
    });

   this.gantt.on('afterTaskEdit', ({ record }: { record: TaskModel }) => {
  const taskId = String(record.id);

  // Serialize helper
  const serializeAssignments = (assignments: any[]) =>
    assignments
      .map((a) => ({
        resource: String(a.resourceId),
        units: a.units ?? 100,
      }))
      .sort((a, b) => a.resource.localeCompare(b.resource));

  const newAssignments = serializeAssignments(record.assignments);
  const originalAssignments = serializeAssignments(
    this.assignments.filter((a) => a.event === taskId)
  );

  const assignmentsChanged = JSON.stringify(newAssignments) !== JSON.stringify(originalAssignments);

  const task = record as unknown as GanttTask;
  const updatedTask: GanttTask = {
    name: task.name,
    startDate: task.startDate instanceof Date ? task.startDate.toISOString().split('T')[0] : String(task.startDate),
    endDate: task.endDate instanceof Date ? task.endDate.toISOString().split('T')[0] : String(task.endDate),
    duration: task.duration,
    percentDone: task.percentDone,
    parentId: record.parent ? String(record.parent.id) : undefined,
    expanded: task.expanded,
    requiredProfile: task.requiredProfile,
    businessUnit: task.businessUnit,
    priority: task.priority,
    requiredCompetences: task.requiredCompetences,
    requiredCertifications: task.requiredCertifications,
    requiredFormations: task.requiredFormations,
  };

  this.ganttDataService.updateTask(taskId, updatedTask).subscribe({
    next: () => console.log(updatedTask),
    error: (err) => console.error(`Failed to update task ${taskId}`, err),
  });

  if (assignmentsChanged) {
    const currentAssignments = record.assignments.map((a) => ({
      id: a.id ?? null,
      event: taskId,
      resource: String(a.resourceId),
      units: a.units ?? 100,
    }));

    this.ganttDataService.replaceAssignments(taskId, currentAssignments).subscribe({
      next: () => console.log(`Assignments updated for task ${taskId}`),
      error: (err) => console.error(`Failed to update assignments for task ${taskId}`, err),
    });
  } else {
    console.log('No assignment changes detected, skipping update');
  }
});
  }
}
