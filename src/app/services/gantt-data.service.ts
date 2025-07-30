import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '@bryntum/gantt';

interface GanttData {
  tasks: any[];
  dependencies: any[];
  resources: any[];
  assignments: any[];
}

export interface GanttTask extends Partial<TaskModel> {
  _id?: string;
  id?: string;
  name: string;
  duration: number;
  percentDone: number;
  startDate: string | Date;
  endDate: string | Date;
  parentId?: string;
  expanded?: boolean;


  // Add your custom fields:
  priority?: string;
  requiredProfile?: string;
  businessUnit?: string; // Business Unit
  requiredCompetences?: string;
  requiredCertifications?: string;
  requiredFormations?: string;
  description?:string;
}
@Injectable({
  providedIn: 'root'
})
export class GanttDataService {
  private readonly BASE_URL = 'http://localhost:3000';
  private readonly DATA_URL = `${this.BASE_URL}/data`;
  private readonly TASKS_URL = `${this.BASE_URL}/tasks`;

  constructor(private http: HttpClient) {}

  getGanttData(): Observable<{ data: GanttData }> {
    return this.http.get<{ data: GanttData }>(this.DATA_URL);
  }

  addTask(task: GanttTask): Observable<GanttTask> {
    return this.http.post<GanttTask>(this.TASKS_URL, task);
  }

  updateTask(_id: string, updates: Partial<GanttTask>): Observable<GanttTask> {
    return this.http.put<GanttTask>(`${this.TASKS_URL}/${_id}`, updates);
  }

  deleteTask(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.TASKS_URL}/${_id}`);
  }

  replaceAssignments(taskId: string, assignments: any[]): Observable<any> {
    return this.http.put(`${this.BASE_URL}/assignments/${taskId}`, { assignments });
  }
}
