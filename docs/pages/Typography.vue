<template>
  <q-page padding> 
    <div class="row">
      <div class="col-12">
        <q-card dense bordered square>          
          <q-card-section class="q-pa-md">
            <div class="row">
              <q-icon name="person"
                      class="q-mr-sm"
                      size="sm"/>
              <div class="col">            
                <div class="text-h6">Productos</div>
                <!-- <div class="text-caption text-italic">Productos disponibles</div> -->
              </div>
              <q-space/>
              <q-btn icon="refresh" size="sm" flat dense @click="apiGet"/> 
              <q-btn icon="add" size="sm" flat dense @click="openDialogoNew"/> 
            </div>   
          </q-card-section> 
          <q-separator/>
          <q-card-section>
            <q-table 
              v-if="data"
              class="no-border no-box-shadow"
              :filter="filterText"
              :data="data"
              :columns="columns"
              row-key="name"
              :bordered="false">
              <template v-slot:top-right>
                <q-input square filled dense clearable debounce="100" v-model="filterText" placeholder="Filtro...">
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:body-cell-accion="cell">
                <q-td :cell="cell" auto-width>
                  <q-btn icon="edit"
                         size="sm"
                         flat
                         dense
                         @click="openDialogo(cell.row)"
                         >
                        <!-- @click="apiPut(cell.row.id_producto)" -->
                    <q-tooltip>
                      Configuración del perfil
                    </q-tooltip>
                  </q-btn>
                  <q-btn icon="delete" size="sm" flat dense @click="confirmDelete(cell.row)">
                    <q-tooltip>
                      Eliminar producto
                    </q-tooltip>
                  </q-btn>
                </q-td>
              </template>   
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="dialogo" persistent>
      <q-card dense bordered square style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pa-md">
          <div class="row">
            <q-icon name="person"
                class="q-mr-sm"
                size="sm"/>
            <div class="col">            
              <div class="text-h6">Editar Producto</div>                
            </div>
            <q-space/>
            <q-btn icon="close" size="sm" flat dense @click="dialogo = false"/> 
          </div>   
        </q-card-section> 
        <q-separator/>
        <div class="q-pa-md">  
          <q-form @submit="onSubmit" 
                  class="q-gutter-md">                    
              <q-input
                filled
                v-model="producto.id_producto"
                label="Clave"
                :disable="true"                
              />
              <q-input
                filled
                v-model="producto.nombre"
                label="Nombre"                                
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'No puede estar en blanco']"
              />
              <q-input
                filled
                v-model="producto.categoria"
                label="Categoría"                                
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'No puede estar en blanco']"
              />
              <q-input
                filled
                v-model="producto.descripcion"
                label="Descripción"                                
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'No puede estar en blanco']"
              />
              <q-input
                filled
                type="number"
                v-model="producto.precio"
                label="Your age *"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || 'No puede estar en blanco',
                  val => val > 0 && val < 100 || 'Introduzca un precio real'
                ]"
              />                 
            <q-separator/>
            <q-card-actions align="right" class="q-pt-sm">
              <q-btn icon="save" type="submit" color="primary" label="Guardar"/>
            </q-card-actions>
          </q-form>  
        </div>    
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from "axios"

export default {

  name: 'typography',
  data() {
    return {
      columns: [
        { name: 'id_producto', align: 'rigth', label: 'Id', field: 'id_producto', sortable: true },
        { name: 'categoria', align: 'center', label: 'Categoría', field: 'categoria', sortable: true },
        { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'descripcion', align: 'center', label: 'Descripcion', field: 'descripcion', sortable: true },
        { name: 'precio', align: 'right', label: 'Precio', field: 'precio', sortable: true },
        { name: 'accion', align: 'right', label: 'Acción', field: 'accion', sortable: false },
      ],
      data: null,
      filterText: '',
      dialogo: false,
      dialogTitle: '',
      producto: {
        id_producto: '',
        categoria: '',
        nombre: '',
        descripcion: '',
        precio: ''
      }      
    }
  },
  methods: {
    apiGet () {
      axios
        .get('http://127.0.0.1:8000/api/productos/')
        .then(response => (this.data = response.data.data))
    },
    apiPut () {
      // const data = {
      //   id_producto: id,
      //   categoria: 'cambio desde vue',
      //   nombre: 'cambio desde vue',
      //   descripcion: 'cambio desde vue',
      //   precio: 32
      // }
      axios.put("http://127.0.0.1:8000/api/productos/" + this.producto.id_producto, 
                this.producto)
        .then((result) => {
          if (result.statusText === 'OK') {
            this.$q.notify({
              message: result.data.message,
              color: 'positive'
            })
            this.apiGet()
            this.dialogo = false
          }
          console.log(result);
      });
    },
    apiPost () {
      const data = this.producto
      axios.post("http://127.0.0.1:8000/api/productos/", data)
        .then((result) => {
          if (result.statusText === 'OK') {
            this.$q.notify({
              message: result.data.message,
              color: 'positive'
            })
            this.apiGet()
            this.dialogo = false
          }
          console.log(result);
      });
    },
    apiDelete (id){
      axios.delete("http://127.0.0.1:8000/api/productos/" + id)
        .then((result) => {
          if (result.statusText === 'OK') {
            this.$q.notify({
              message: result.data.message,
              color: 'positive'
            })
            this.apiGet()
          }
          console.log(result);
      });
    },
    openDialogo (row) {
      this.$set(this.producto, 'id_producto', row.id_producto)
      this.$set(this.producto, 'nombre', row.nombre)
      this.$set(this.producto, 'categoria', row.categoria)
      this.$set(this.producto, 'descripcion', row.descripcion)
      this.$set(this.producto, 'precio', row.precio)
      this.dialogTitle = 'Editar Producto'
      this.dialogo = true
    },
    openDialogoNew () {
      this.$set(this.producto, 'id_producto', '')
      this.$set(this.producto, 'nombre', '')
      this.$set(this.producto, 'categoria', '')
      this.$set(this.producto, 'descripcion', '')
      this.$set(this.producto, 'precio', '')
      this.dialogTitle = 'Agregar Producto'
      this.dialogo = true
    },
    ejecutar (row) {
      console.log(row)
    },
    onSubmit () {
      if (this.dialogTitle === 'Agregar Producto') {
        this.apiPost()
      } else {
        this.apiPut()
      }      
    },
    confirmDelete (row) {
      this.$q.dialog({
        title: 'Confirmación',
        icon: 'warning',
        message: '¿Está seguro de eliminar ' + row.id_producto + '?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.apiDelete(row.id_producto)
      })
    }
  },
  beforeMount () {
    this.apiGet()
  }
}
</script>