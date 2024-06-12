---
tags:
- Batch
- Image
- ImageBatch
---

# 🛠️ CR Batch Images From List
## Documentation
- Class name: `CR Batch Images From List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List/🛠️ Utils`
- Output node: `False`

This node is designed to transform a list of images into a batched format, facilitating operations that require batch processing. It also provides a help link for further guidance on list-related operations.
## Input types
### Required
- **`image_list`**
    - The list of images to be batched. This input is crucial for the node's operation as it directly influences the creation of the batched images output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`image_batch`**
    - Comfy dtype: `IMAGE`
    - The batched format of the input images, enabling efficient batch processing in subsequent operations.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and guidance on list-related operations within the ComfyUI ecosystem.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_MakeBatchFromImageList:
# based on ImageListToImageBatch by DrLtData

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image_list": ("IMAGE", ),}}

    RETURN_TYPES = ("IMAGE", "STRING",)
    RETURN_NAMES = ("image_batch", "show_help", ) 
    INPUT_IS_LIST = True
    FUNCTION = "make_batch"
    CATEGORY = icons.get("Comfyroll/List/Utils")
   
    def make_batch(self, image_list):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-binary-to-list" 
    
        if len(image_list) <= 1:
            return (image_list,)
            
        batched_images = torch.cat(image_list, dim=0)    

        return (batched_images, show_help, )            

```
