// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Actions = require("./actions-model")
// const { validateAction } = require('./middleware')

router.get('/', (req,res)=>{
    Actions.get()
    .then(allActions =>  {
        res.status(200).json(allActions)
    })
    .catch(err=>{
        res.status(500).json([])
    })
})
router.get('/:id', (req,res)=>{
    const {id} = req.params
    Actions.get(id)
    .then(foundAction => {
        if(foundAction){
          return res.status(200).json(foundAction)
        } else {
          return res.status(404).json({message: "No action with that id"})
        }
      })
      .catch(err=>res.status(500).json({message: "server error"}))
})

router.post('/', (req,res)=>{
    const newAction = req.body
    if(!newAction.notes ||!newAction.description || !newAction.project_id){
        res.status(400).json({message: "Need notes,description and project id"})
    } else {
        Actions.insert(newAction)
            .then(action=>{
                res.status(201).json(action)
            })
            .catch(err=>{
                res.status(500).json({message: "server error"})
            })
    }

})
router.put('/:id', (req,res)=>{
    const {id} = req.params
    const updatedAction = req.body
    
    if(!updatedAction.notes || !updatedAction.description ||  !updatedAction.project_id){
        res.status(400).json({message: "Need notes, project id and description"}) 
    } else {
        Actions.update(id, updatedAction)
        .then(updated=>{
            if(updated){
                return res.status(200).json(updatedAction)
            } else{
                return res.status(404).json({message:"No action with that id"})
            }
        })
        .catch(err=>res.status(500).json({message: "server error"}))
    }
})

router.delete('/:id', (req,res)=>{
    const {id} = req.params
    Actions.remove(id)
        .then(deletedAction => {
            if(deletedAction){
                res.status(200).json(req.body.user)
               } else {
                 res.status(404).json({message: "No action with that id"})
               }  
        })
        .catch(err=>res.status(500).json({message: "server error"}))

})

module.exports = router