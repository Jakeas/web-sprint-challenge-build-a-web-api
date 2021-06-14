// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const Projects = require("./projects-model")
// const { validateProject } = require('./middleware')

router.get('/', (req,res)=>{
    Projects.get()
    .then(allProjects => {
        res.status(200).json(allProjects)
    })
    .catch(err=>{
        res.status(500).json([])
    })
})
router.get('/:id', (req,res)=>{
    const {id} = req.params
    Projects.get(id)
    .then(foundProject => {
        if(foundProject){
          return res.status(200).json(foundProject)
        } else {
          return res.status(404).json({message: "No user with that id"})
        }
      })
      .catch(err=>res.status(500).json({message: "server error"}))
})
router.post('/', (req,res)=>{
    const newProject = req.body
    if(!newProject.name ||!newProject.description || !newProject.completed){
        res.status(400).json({message: "Need name and description"})
    } else {
        Projects.insert(newProject)
            .then(project=>{
                res.status(201).json(project)
            })
            .catch(err=>{
                res.status(500).json({message: "server error"})
            })
    }
})

router.put('/:id', (req,res)=>{
    const {id} = req.params
  const updatedProj = req.body
    
    if(!updatedProj.name || !updatedProj.description || !updatedProj.completed){
        res.status(400).json({message: "Need name and description"}) 
    } else {
        Projects.update(id, updatedProj)
        .then(updated=>{
            if(updated){
                return res.status(200).json(updatedProj)
            } else{
                return res.status(404).json({message:"No project with that id"})
            }
        })
        .catch(err=>res.status(500).json({message: "server error"}))
    }
})

router.delete('/:id', (req,res)=>{
    const {id} = req.params
    Projects.remove(id)
        .then(deletedProj => {
            if(deletedProj){
                res.status(200).json(req.body.user)
               } else {
                 res.status(404).json({message: "No project with that id"})
               }  
        })
        .catch(err=>res.status(500).json({message: "server error"}))

})

router.get('/:id/actions', (req,res)=>{
    const {id} = req.params
    Projects.getProjectActions(id)
    .then(actions => {
      if(actions){
        return res.status(200).json(actions)
      } else {
        return res.status(404).json({message:"No project with that id"})
      }
    })
    .catch(err=>res.status(500).json({message: "server error"}))
})




module.exports = router