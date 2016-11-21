angular.module("TreeView",[]).provider("treeViewConfig",function(){var e=this;this.options={iconLeaf:"fa fa-file glyphicon glyphicon-file",iconExpand:"fa fa-minus glyphicon glyphicon-minus",iconCollapse:"fa fa-plus glyphicon glyphicon-plus",template:['<ul class="tree-view-group">','<li ng-repeat="data in data[children]"','ng-class="{expanded: isExpanded(data)}"','ng-if="!filterModel || isFiltered(data)">','<span class="tree-icon" ng-class="getExpandIcon(data)"','ng-click="toggleExpanded(data, $event)"></span>','<a ng-class="{checked: isChecked(data), indetermine: !isChecked(data) && childrenChecked(data)}"','ng-click="toggleChecked(data, $event)">',"<tree-view-transclude></tree-view-transclude>","</a>","<tree-view-item",'ng-if="data[children] && isExpanded(data)"',"></tree-view-item>","</li>","</ul>"].join(" ")},this.$get=function(){return e.options}}).factory("treeViewService",function(){return{uniqueId:0,applyChanges:function(e,t,n){"addNewItem"===t&&this.transformDataToTree(n,e.$treeView.hashObject,e.$treeView.valueProperty,e.$treeView.childrenProperty)},transformDataToTree:function(e,t,n,i){angular.isArray(e)||(e=[e]);for(var r=[],a=0;a<e.length;a++)r.push(e[a]);for(;r.length;){var c=r.pop();if(c.$treeView=c.$treeView||{},n in c||(c[n]=this.uniqueId++),this.currentLength++,t[c[n]]=c,c[i]&&c[i].length)for(a=0;a<c[i].length;a++){var o=c[i][a];o.$treeView=o.$treeView||{},o.$treeView.parentData=c,r.push(o)}}return t}}}).directive("treeViewItem",function(){return{require:"^treeView",link:function(e,t,n,i){i.template(e,function(e){t.empty().append(e)})}}}).directive("treeViewTransclude",function(){return{link:function(e,t){e.transcludeScope=e.parentScopeOfTree.$new(),e.transcludeScope.node=e.data,e.transcludeScope.$index=e.$index,e.transcludeScope.$first=e.$first,e.transcludeScope.$middle=e.$middle,e.transcludeScope.$last=e.$last,e.transcludeScope.$odd=e.$odd,e.transcludeScope.$even=e.$even,e.$on("$destroy",function(){e.transcludeScope.$destroy()}),e.$treeTransclude(e.transcludeScope,function(e){t.empty().append(e)})}}}).directive("treeView",["treeViewConfig","treeViewService",function(e,t){return{scope:{outputAllInfo:"=",datas:"=inputModel",ngModel:"=",filterModel:"=",recursionCheck:"=",outputDuplicate:"=",singleMode:"=",options:"=",hashObject:"=",enableCheck:"="},transclude:!0,link:function(e,t,n,i,r){i.template(e,function(e){t.empty().append(e)}),e.$treeTransclude=r},controller:["$scope","$element","$attrs","$compile",function(n,i,r,a){n.parentScopeOfTree=n.$parent,n.options=n.options||{},n.displayProperty=n.options.displayProperty||"text",n.valueProperty=n.options.valueProperty||"id",n.children=n.options.childrenProperty||"children",n.iconLeaf=n.options.iconLeaf||e.iconLeaf,n.iconExpand=n.options.iconExpand||e.iconExpand,n.iconCollapse=n.options.iconCollapse||e.iconCollapse,n.iconCheck=n.options.iconCheck||e.iconCheck,n.iconUnCheck=n.options.iconUnCheck||e.iconUnCheck,this.template=a(e.template);var c={arrayMinus:function(e,t){e=e||[],t=t||[];for(var n=[],i=0;i<e.length;i++)-1===this.find(t,e[i])&&n.push(e[i]);return n},find:function(e,t){if(angular.isObject(t)){for(var i=0;i<e.length;i++)if(t[n.valueProperty]===e[i][n.valueProperty])return i;return-1}return e.indexOf(t)},shallowMinus:function(e,t){for(var n=0;n<e.length;n++)-1!==t.indexOf(e[n])&&(e.splice(n,1),n--)}},o={modelInited:!1,inited:!1,init:function(e){i.addClass("tree-view"),e.$treeView={hashObject:this.hashObject,valueProperty:n.valueProperty,childrenProperty:n.children},this.transformDataToTree(e),n.data={},n.data[n.children]=e,this.inited||this.bindEvents(),this.inited=!0,this.modelInited=!1},unwrap:function(e){for(var t=0;t<e.length;t++)e[t]=e[t][n.valueProperty]},updateModelByCheck:function(e,t,i){n.outputAllInfo||this.unwrap(e),t===!0?(n.ngModel=n.ngModel||[],Array.prototype.push.apply(n.ngModel,e)):c.shallowMinus(n.ngModel,e),n.outputDuplicate||(t===!0&&this.deleteDuplicated(n.ngModel),t===!1&&this.fillResult(n.ngModel,e,i))},fillResult:function(e,t,i){for(var r=[],a=i;a.$treeView.parentData;){var c=this.getParentItem(a);if(-1===t.indexOf(c))break;r.push(a),a=a.$treeView.parentData}if(r.length)for(var o=0;o<r.length;o++){var l=[].concat(r[o].$treeView.parentData[n.children]);l.splice(l.indexOf(r[o]),1),n.outputAllInfo||this.unwrap(l),Array.prototype.push.apply(e,l)}},deleteDuplicated:function(e){for(var t=[],i=0;i<e.length;i++){var r;n.outputAllInfo?r=e[i].$treeView.parentData:(r=this.hashObject[e[i]].$treeView.parentData,r=r&&r[n.valueProperty]),-1!==e.concat(t).indexOf(r)&&(t=t.concat(e.splice(i,1)),i--)}},updateStateByModelChange:function(e,t){var i;i=this.modelInited?c.arrayMinus(e,t):e||[];for(var r=c.arrayMinus(t,e),a=0;a<i.length;a++){var o=n.outputAllInfo?i[a]:this.hashObject[i[a]];o.$treeView.isChecked=!0,this.expandUp(o),this.modelInited||n.outputDuplicate||this.calculateDown(o)}for(a=0;a<r.length;a++)o=n.outputAllInfo?r[a]:this.hashObject[r[a]],!n.outputDuplicate&&o.$treeView.parentData&&o.$treeView.parentData.$treeView.isChecked||(o.$treeView.isChecked=!1,n.outputDuplicate||e.length&&(1!==r.length||i.length)||this.calculateDown(o));n.outputDuplicate||e.length!==this.currentLength||this.deleteDuplicated(n.ngModel),this.modelInited=!0},expandUp:function(e){var t=e.$treeView.parentData;t&&!t.$treeView.isExpanded&&(t.$treeView.isChecked?this.expandUp(t):(t.$treeView.isExpanded=!0,this.expandUp(t)))},getParentItem:function(e){var t,i=angular.isObject(e)?e:this.hashObject[e];return n.outputAllInfo?t=e.$treeView.parentData:(t=i.$treeView.parentData,t=t&&t[n.valueProperty]),t},calculateChecked:function(e,t){this.calculateDown(e,t),this.calculateUp(e,t)},calculateDown:function(e,t){if(e[n.children])for(var i=0;i<e[n.children].length;i++)e[n.children][i].$treeView.isChecked!==e.$treeView.isChecked&&(t&&t.push(e[n.children][i]),e[n.children][i].$treeView.isChecked=e.$treeView.isChecked,this.calculateDown(e[n.children][i],t))},calculateUp:function(e,t){if(e.$treeView.parentData&&e.$treeView.parentData.$treeView.isChecked!==e.$treeView.isChecked){for(var i=!!e.$treeView.parentData.$treeView.isChecked,r=0,a=0;a<e.$treeView.parentData[n.children].length;a++)e.$treeView.parentData[n.children][a].$treeView.isChecked&&r++;e.$treeView.parentData.$treeView.isChecked=r===a,e.$treeView.parentData.$treeView.isChecked!==i&&(t&&t.push(e.$treeView.parentData),this.calculateUp(e.$treeView.parentData))}},hashObject:{},currentLength:0,transformDataToTree:function(e){t.transformDataToTree(e,this.hashObject,n.valueProperty,n.children),r.hashObject&&(n.hashObject=this.hashObject)},bindEvents:function(){var e=this;n.singleMode?n.$watch("ngModel",function(t,n){e.updateStateByModelChange(t,n)}):n.$watchCollection("ngModel",function(t,n){t=t||[],n=n||[],e.updateStateByModelChange(t,n)}),n.$watch("filterModel",function(t,i){if(t){var r=[];angular.forEach(e.hashObject,function(e,i){-1!==e[n.displayProperty].toString().indexOf(t)?r.push(e):e.$treeView.isFiltered=!1});for(var a=0;a<r.length;a++)r[a].$treeView.isFiltered=!0,e.filtUp(r[a]),e.expandUp(r[a])}})},filtUp:function(e){e.$treeView.parentData&&!e.$treeView.parentData.isFiltered&&(e.$treeView.parentData.isFiltered=!0,this.filtUp(e.$treeView.parentData))}};n.getExpandIcon=function(e){return e[n.children]&&e[n.children].length?e.$treeView.isExpanded?n.iconExpand:n.iconCollapse:n.iconLeaf},n.toggleExpanded=function(e,t){e.$treeView.isExpanded=!e.$treeView.isExpanded,t.stopPropagation()},n.isExpanded=function(e){return!(!e.$treeView||!e.$treeView.isExpanded)},n.isChecked=function(e){return!(!e.$treeView||!e.$treeView.isChecked)},n.childrenChecked=function(e){if(!e[n.children]||!e[n.children].length)return!1;for(var t=[],i=e[n.children],r=0;r<i.length;r++)t.push(i[r]);for(;t.length;){var a=t.pop();if(a.$treeView.isChecked)return!0;if(a.children&&a.children.length)for(r=0;r<a.children.length;r++)t.push(a.children[r])}return!1},n.toggleChecked=function(e){var t=n.isChecked(e),i=[e];n.singleMode&&o.initCheck(),e.$treeView.isChecked=!t,n.recursionCheck&&o.calculateChecked(e,i),o.updateModelByCheck(i,e.$treeView.isChecked,e)},n.isFiltered=function(e){return!!e.$treeView.isFiltered},n.isCheckable=function(){return n.enableCheck!==!1},n.$watch("datas",function(e,t){angular.isDefined(e)&&o.init(e)})}]}}]);