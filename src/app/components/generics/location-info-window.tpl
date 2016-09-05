<div flex layout="column"
     layout-padding>   
      <div flex='50' layout="column" layout-align='center start' layout-padding>
         <div flex-lg='50' flex-md='60' flex-sm="70" flex-xs="85" layout="column" layout-align='center start' layout-padding>
            <md-button ui-sref='app.inside.studio-profile-public({id: parameter.id})'
                       class="pf-font-default white-text font-18-pt md-headline">
               {{parameter.studioName}}
{*               NOMBRE DEL ESTUDIO AQUI*}
            </md-button>
         </div>
         <div flex-lg='50' flex-md='40' flex-sm="30" flex-xs="15" layout="column" layout-align='center start' layout-padding>
            <span class="pf-font-default white-text font-18-pt" show-xs hide-sm show-gt-sm>{{parameter.studioCityName}}</span>
         </div>
      </div>

      <md-divider class="divider-white-1"></md-divider>
      {*<div flex='50' layout-align='center start' layout-padding> 
         <stars config="$ctrl.starConfig"></stars>
      </div>*}
   </div>
