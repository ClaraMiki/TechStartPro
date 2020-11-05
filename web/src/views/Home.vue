<template>
  <div class="home">
    <v-btn @click='createCategoryDialog = true'>
      Criar novo
    </v-btn>
    <v-btn @click='createCategories'>
      Ler Arquivo CSV
    </v-btn>
    <v-data-table
      :headers='categories.headers'
      :items='categories.items'
      title='Categorys'
    >
      <template v-slot:item.actions='{ item }'>
        <v-col>
            <v-tooltip bottom>
                <template v-slot:activator='{ on }'>
                    <v-icon @click='deleteCategory(item.id)' v-on='on'>
                        mdi-delete
                    </v-icon>
                </template>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator='{ on }'>
                    <v-icon @click='processUpdateCategory(item.id)' v-on='on'>
                        mdi-update
                    </v-icon>
                </template>
            </v-tooltip>
        </v-col>
      </template>
    </v-data-table>
    <v-dialog v-model='createCategoryDialog' width='500'>
      <v-form class='form-background'>
        <v-text-field
          label="Id"
          v-model="newId"
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="newDescription"
        ></v-text-field>

        <v-btn @click="newCategory">Criar</v-btn>
      </v-form>
    </v-dialog>
    <v-dialog v-model='updateCategoryDialog' width='500'>
      <v-form class='form-background'>
        <v-text-field
          :disabled='createCategoryDialog'
          label="Id"
          v-model="newId"
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="newDescription"
        ></v-text-field>
        <v-btn @click="updateCategory">Atualizar</v-btn>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import api from '../services/api.ts';
  export default {
    name: 'Home',
    data: function () {
      return {
        categories: {
          headers: [
            {
              text: 'Code',
              value: 'id',
            },
            {
              text: 'Description',
              value: 'description',
            },
            {
              text: 'Actions',
              value: 'actions',
            },
          ],
          items: [],
        },
        createCategoryDialog: false,
        updateCategoryDialog: false,
        newDescription: null,
        newId: null,
      };
    },
    created: function () {
      this.searchCategorys()
    },
    methods: {
      searchCategorys: function () {
        this.categories.items = [];
        api.get('categories').then(response => {
          this.categories.items = response.data;
        });
      },
      newCategory: function () {
        api.post('categories',{
          id: this.newId,
          description: this.newDescription,
        }).then(() => {
          alert('Created');
        });
        this.clearFields();
      },
      createCategories: function () {
        api.post('categories-csv');
        this.clearFields();
      },
      updateCategory: function () {
        api.put(`categories/${this.newId}/${this.newDescription}`).then(() => {
          alert('Updated');
        });
        this.clearFields();
      },
      deleteCategory: function (idCategory) {
        api.delete(`categories/${idCategory}`).then(() => {
          alert('Deleted');
        });
        this.searchCategorys();
      },
      processUpdateCategory: function (idCategory) {
        this.updateCategoryDialog = true;
        this.newId = idCategory;
      },
      clearFields: function () {
        this.newId = '';
        this.newDescription = '';
        this.createCategoryDialog = false;
        this.updateCategoryDialog = false;
        this.searchCategorys();
      }
    },
  };
</script>

<style scoped>
  .form-background {
    background: white;
  }
</style>
