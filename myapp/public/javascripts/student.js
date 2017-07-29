var app = angular.module("student", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
app.controller("studentController", ['$scope','addStudent','getStudent','deleteStudent', function($scope,addStudent,getStudent,deleteStudent)  {
$scope.message=1;
$scope.data={
	'name':'',
	'lastName':'',
    'studentId':'',
    'phone':'',
    'address':''
};


$scope.id={
  'studentId':''
};

$scope.submit=function(){
    addStudent.postData($scope.data);
}

$scope.getData=function(){
//alert($scope.subject);
getStudent.getData($scope.id).then(function(data){
//alert(JSON.stringify(data));
  $scope.Data= data;
 
  
});
}

$scope.deleteStudent=function(data){
//alert($scope.subject);
deleteStudent.getData(data.studentId).then(function(data){
//alert(JSON.stringify(data));
  $scope.Data= data;
 
  
});

}

}]);

app.service("addStudent",['$http',function($http){
return{
  postData:function(data){

   // alert(data);
  $http({
    url: '/addStudent',
    method: "POST",
    data: data,
    headers: {
             'Content-Type': 'application/json'
    }
}).then(function(resp){
  if(resp.data.errorcode===1){
alert(resp.data.message);  
};

})
}
}
}]);

app.service("getStudent", ['$http', function ($http) {
    return {
        getData: function (data) {
            //alert(JSON.stringify(data));
           data1= $http({
                url: '/getStudent/'+data.studentId,
                method: "GET",
            }).then(function (resp) {
              if(resp.data.errorcode===0)
              alert(resp.data.message);
             else
                return resp.data;
                
            })
            return data1;
        }
        
    }
}]);


app.service("deleteStudent", ['$http', function ($http) {
    return {
        getData: function (data) {
            //alert(JSON.stringify(data));
           data1= $http({
                url: '/deleteStudent/'+data,
                method: "GET",
            }).then(function (resp) {
                alert(JSON.stringify(resp.data));
                return resp.data;
                
            })
            return data1;
        }
        
    }
}]);