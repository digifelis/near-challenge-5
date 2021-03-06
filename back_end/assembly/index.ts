import { Project } from "./model";

export function create(address: string, name: string, funds: string, description: string,photo:string): u32 {
  // use the Project class to persist the project data
  return Project.createProject(address, name, funds, description, photo);
}

// Get project by its id
export function getProject(projectId: u32): Project {
  return Project.getProjectById(projectId);
}

// List all existing projects
export function listOfProjects(): Array<Project> {
  return Project.getAllProjects();
}

// List the ids of the existing projects 
export function listOfIdProject(): Array<u32> {
  return Project.getAll();
}

// Delete project by its id 
export function deleteProjectById(projectId: u32): void {
  Project.deleteProject(projectId)
}

// Update the fund of project by its id 
// This function can be extended to update the other fields of the projects 
export function updateFund(projectId: u32, fund: string): Project {
  return Project.updateFundOfProject(projectId, fund)
}

// Donate for project the amount is determined by the incoming funds  
export function donateForPoject(accountId: string, id: u32, funds: string): string {
  //return Project.donate()
  return Project.donateForProject(accountId, id, funds)
}

// Get the number of added projects 
export function getNumberOfProjects():u32{
  return Project.getAddedProjects()
}

// Get the number of funded projects
export function getFundedProjectsNumber():u32{
  return Project.getNumOfFundedProjects()
}

// Get projects by specific range 
export function getProjectsBySpecifcNumber(startIndex:i32,endIndex:i32):Array<Project>{
  return Project.getProjectsByNnumber(startIndex,endIndex)
}