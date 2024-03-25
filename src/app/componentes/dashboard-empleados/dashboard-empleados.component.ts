import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/servicios/empleado/empleado.service';

@Component({
  selector: 'app-dashboard-empleados',
  templateUrl: './dashboard-empleados.component.html',
  styleUrls: ['./dashboard-empleados.component.css']
})
export class DashboardEmpleadosComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  empleados: any;
  indiceEmpleadoAEliminar: number = -1;

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.getAllEmployees().subscribe(response => {
      this.empleados = response;
    },
      error => {
        console.error(error)
      });
  }

  eliminar(empleado: any) {
    this.empleadoService.deleteEmployee(empleado.idEmpleado).subscribe(response => {
      if (response.deleted == true) {
        this.empleados.splice(this.indiceEmpleadoAEliminar, 1);
      }
      this.cerrarEliminarPopup();

      this.empleadoService.getAllEmployees().subscribe(response => {
      this.empleados = response;
    });
    });
  }

  abrirEliminarPopup(indice: number): void {
    this.popupEliminarVisible = true;
    this.indiceEmpleadoAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceEmpleadoAEliminar = -1;
  }
}
