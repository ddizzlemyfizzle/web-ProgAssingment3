class Request {

    constructor(requestMethod, controllerName, parameters) {

//look in here
        if(controllerName!=undefined){
            controllerName=controllerName.split("/");
        }


       if(controllerName!=undefined){
        if (controllerName[1]=='category'){

        
            if(this.parameters==undefined){
                this.parameters={};
        
            }
             else{
                  this.controllerName=""
                }
                //this.controllerName="" 
            
            if(requestMethod!=null){
                this.requestMethod=requestMethod;
               }
            else{
                this.requestMethod='GET';
               }
             
            if(parameters!=null && parameters!=undefined){
        
              
        
                this.parameters={
                    body:{ userID:parameters.userId, title:parameters.title, description:parameters.description} ,
        
                    header:this.controllerName
                }
        
                if(controllerName.length==1 && parameters.name!=null){
                    this.parameters={
                        body:{userID:parameters.userId, title:parameters.title, description:parameters.description} ,
            
                        header:controllerName[1]
                    }
                }
        
                if(controllerName.length==2 && parameters.name==null){
        
                    this.parameters={
                        body:{userID:parameters.userId, title:parameters.title, description:parameters.description} ,
            
                        header:[controllerName[2]]
                    }
        
                }
        
                if(controllerName.length==2 && parameters.name!=null){
        
                    this.parameters={
                        body:{userID:parameters.userId, title:parameters.title, description:parameters.description} ,
            
                        header:[]
                    }
        
                }
        
                if(controllerName.length==3 && parameters.name!=null){
        
                    this.parameters={
                        body:{userID:parameters.userId, title:parameters.title, description:parameters.description} ,
            
                        header:[controllerName[2]]
                    }
        
                }
        
        
                if(controllerName.length==3 && parameters.name==null){
        
                    this.parameters={
                        body:{userID:parameters.userId, title:parameters.title, description:parameters.description} ,
            
                        header:[controllerName[2]]
                    }
                    
                   }

                   this.controllerName=controllerName[1];
            }
            else
            {
               if(this.requestMethod=="DELETE"){
        
                if(controllerName!=undefined){
                    //controllerName=controllerName.split("/");
                    this.controllerName=controllerName[1];
                }
        
                this.parameters={
                    header:[controllerName[2]]
                }
               }
               else{
        
                if(controllerName!=undefined){
                    //controllerName=controllerName.split("/");
        
                    if(controllerName.length==3){
        
                        this.controllerName=controllerName[1];
                        this.parameters={
                
                            header:[controllerName[2]]
                        }
            
                    }
        
                    if(controllerName.length==2){
        
                       this.controllerName=controllerName[1];
            
                    }
                    
                }
        
              
        
               }
        
              
        
               
            }

        }


        if (controllerName[1]=='user'){

        
            if(this.parameters==undefined){
                this.parameters={};
        
            }
             else{
                  this.controllerName=""
                }
                //this.controllerName="" 
            
            if(requestMethod!=null){
                this.requestMethod=requestMethod;
               }
            else{
                this.requestMethod='GET';
               }
             
            if(parameters!=null && parameters!=undefined){
        
              
        
                this.parameters={
                    body:{ username:parameters.username, email:parameters.email, password:parameters.password} ,
        
                    header:this.controllerName
                }
        
                if(controllerName.length==1 && parameters.name!=null){
                    this.parameters={
                        body:{ username:parameters.username, email:parameters.email, password:parameters.password} ,
            
                        header:controllerName[1]
                    }
                }
        
                if(controllerName.length==2 && parameters.name==null){
        
                    this.parameters={
                        body:{ username:parameters.username, email:parameters.email, password:parameters.password} ,
            
                        header:[controllerName[2]]
                    }
        
                }
        
                if(controllerName.length==2 && parameters.name!=null){
        
                    this.parameters={
                        body:{ username:parameters.username, email:parameters.email, password:parameters.password} ,
            
                        header:[]
                    }
        
                }
        
                if(controllerName.length==3 && parameters.name!=null){
        
                    this.parameters={
                        body:{ username:parameters.username, email:parameters.email, password:parameters.password} ,
            
                        header:[controllerName[2]]
                    }
        
                }
        
        
                if(controllerName.length==3 && parameters.name==null){
        
                    this.parameters={
                        body:{ username:parameters.username, email:parameters.email, password:parameters.password} ,
            
                        header:[controllerName[2]]
                    }
                    
                   }

                this.controllerName=controllerName[1];
            }
            else
            {
               if(this.requestMethod=="DELETE"){
        
                if(controllerName!=undefined){
                    //controllerName=controllerName.split("/");
                    this.controllerName=controllerName[1];
                }
        
                this.parameters={
                    header:[controllerName[2]]
                }
               }
               else{
        
                if(controllerName!=undefined){
                    //controllerName=controllerName.split("/");
        
                    if(controllerName.length==3){
        
                        this.controllerName=controllerName[1];
                        this.parameters={
                
                            header:[controllerName[2]]
                        }

                        //if(this.parameters.header[0]==undefined)
            
                    }
        
                    if(controllerName.length==2){
        
                       this.controllerName=controllerName[1];
            
                    }
                    
                }
        
              
        
               }
        
              
        
               
            }

        }

        
        if (controllerName[1]=='post'){

        
            if(this.parameters==undefined){
                this.parameters={};
        
            }
             else{
                  this.controllerName=""
                }
                //this.controllerName="" 
            
            if(requestMethod!=null){
                this.requestMethod=requestMethod;
               }
            else{
                this.requestMethod='GET';
               }
             
            if(parameters!=null && parameters!=undefined){
        
              
        
                this.parameters={
                    body:{ userID:parameters.userId, categoryID:parameters.categoryId, title:parameters.title, type:parameters.type, content:parameters.content, user:parameters.user, category:parameters.category} ,
        
                    header:this.controllerName
                }
        
                if(controllerName.length==1 && parameters.name!=null){
                    this.parameters={
                        body:{userID:parameters.userId, categoryID:parameters.categoryId, title:parameters.title, type:parameters.type, content:parameters.content, user:parameters.user, category:parameters.category} ,
            
                        header:controllerName[1]
                    }
                }
        
                if(controllerName.length==2 && parameters.name==null){
        
                    this.parameters={
                        body:{userID:parameters.userId, categoryID:parameters.categoryId, title:parameters.title, type:parameters.type, content:parameters.content, user:parameters.user, category:parameters.category} ,
            
                        header:[controllerName[2]]
                    }
        
                }
        
                if(controllerName.length==2 && parameters.name!=null){
        
                    this.parameters={
                        body:{userID:parameters.userId, categoryID:parameters.categoryId, title:parameters.title, type:parameters.type, content:parameters.content, user:parameters.user, category:parameters.category} ,
            
                        header:[]
                    }
        
                }
        
                if(controllerName.length==3 && parameters.name!=null){
        
                    this.parameters={
                        body:{userID:parameters.userId, categoryID:parameters.categoryId, title:parameters.title, type:parameters.type, content:parameters.content, user:parameters.user, category:parameters.category} ,
            
                        header:[controllerName[2]]
                    }
        
                }
        
        
                if(controllerName.length==3 && parameters.name==null){
        
                    this.parameters={
                        body:{userID:parameters.userId, categoryID:parameters.categoryId, title:parameters.title, type:parameters.type, content:parameters.content, user:parameters.user, category:parameters.category} ,
            
                        header:[controllerName[2]]
                    }
                    
                   }

                   this.controllerName=controllerName[1];
            }
            else
            {
               if(this.requestMethod=="DELETE"){
        
                if(controllerName!=undefined){
                    //controllerName=controllerName.split("/");
                    this.controllerName=controllerName[1];
                }
        
                this.parameters={
                    header:[controllerName[2]]
                }
               }
               else{
        
                if(controllerName!=undefined){
                    //controllerName=controllerName.split("/");
        
                    if(controllerName.length==3){
        
                        this.controllerName=controllerName[1];
                        this.parameters={
                
                            header:[controllerName[2]]
                        }
            
                    }
        
                    if(controllerName.length==2){
        
                       this.controllerName=controllerName[1];
            
                    }
                    
                }
        
              
        
               }
        
              
        
               
            }

        }


        if (controllerName[1]=='comment'){

        
            if(this.parameters==undefined){
                this.parameters={};
        
            }
             else{
                  this.controllerName=""
                }
                //this.controllerName="" 
            
            if(requestMethod!=null){
                this.requestMethod=requestMethod;
               }
            else{
                this.requestMethod='GET';
               }
             
            if(parameters!=null && parameters!=undefined){
        
              
        
                this.parameters={
                    body:{ userID:parameters.userId, postID:parameters.postId, replyID:parameters.replyId, commentRepliedTo:parameters.commentRepliedTo, content:parameters.content, user:parameters.user, post:parameters.post} ,
        
                    header:this.controllerName
                }
        
                if(controllerName.length==1 && parameters.name!=null){
                    this.parameters={
                        body:{ userID:parameters.userId, postID:parameters.postId, replyID:parameters.replyId, commentRepliedTo:parameters.commentRepliedTo, content:parameters.content, user:parameters.user, post:parameters.post} ,
            
                        header:controllerName[1]
                    }
                }
        
                if(controllerName.length==2 && parameters.name==null){
        
                    this.parameters={
                        body:{ userID:parameters.userId, postID:parameters.postId, replyID:parameters.replyId, commentRepliedTo:parameters.commentRepliedTo, content:parameters.content, user:parameters.user, post:parameters.post} ,
            
                        header:[controllerName[2]]
                    }
        
                }
        
                if(controllerName.length==2 && parameters.name!=null){
        
                    this.parameters={
                        body:{userID:parameters.userId, postID:parameters.postId, replyID:parameters.replyId, commentRepliedTo:parameters.commentRepliedTo, content:parameters.content, user:parameters.user, post:parameters.post} ,
            
                        header:[]
                    }
        
                }
        
                if(controllerName.length==3 && parameters.name!=null){
        
                    this.parameters={
                        body:{userID:parameters.userId, postID:parameters.postId, replyID:parameters.replyId, commentRepliedTo:parameters.commentRepliedTo, content:parameters.content, user:parameters.user, post:parameters.post} ,
            
                        header:[controllerName[2]]
                    }
        
                }
        
        
                if(controllerName.length==3 && parameters.name==null){
        
                    this.parameters={
                        body:{userID:parameters.userId, postID:parameters.postId, replyID:parameters.replyId, commentRepliedTo:parameters.commentRepliedTo, content:parameters.content, user:parameters.user, post:parameters.post} ,
            
                        header:[controllerName[2]]
                    }
                    
                   }

                   this.controllerName=controllerName[1];
            }
            else
            {
               if(this.requestMethod=="DELETE"){
        
                if(controllerName!=undefined){
                    //controllerName=controllerName.split("/");
                    this.controllerName=controllerName[1];
                }
        
                this.parameters={
                    header:[controllerName[2]]
                }
               }
               else{
        
                if(controllerName!=undefined){
                    //controllerName=controllerName.split("/");
        
                    if(controllerName.length==3){
        
                        this.controllerName=controllerName[1];
                        this.parameters={
                
                            header:[controllerName[2]]
                        }
            
                    }
        
                    if(controllerName.length==2){
        
                       this.controllerName=controllerName[1];
            
                    }
                    
                }
        
              
        
               }
        
              
        
               
            }

        }

        if (controllerName[1]==''){

              
            if(requestMethod!=null){
                this.requestMethod=requestMethod;
               }

               this.controllerName="";

        }


      


    }
       
       
        
         
           //not right, these have to be parsed
    }
    
        getControllerName(){
    
    if(this.controllerName==undefined){
        this.controllerName="";
    }
    
            return this.controllerName;
    
       }

       setControllerName(controllerName2){
           controllerName=controllerName2
       }
    
        getRequestMethod() {
    
            return this.requestMethod;
    
    
       }
    
       getParameters() {
           return this.parameters
           
       }
    
        
    
    }



module.exports = Request;
