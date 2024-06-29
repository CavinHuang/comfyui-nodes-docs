---
tags:
- Image
- ImageListLoader
---

# CR Image List Simple (Legacy)
## Documentation
- Class name: `CR Image List Simple`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

The CR Image List Simple node is designed to create a simple list of images from a specified set of individual images. It allows for the aggregation of multiple image inputs into a single list, facilitating operations that require a collection of images as input.
## Input types
### Required
### Optional
- **`image_1`**
    - Represents the first image to be included in the list. Its inclusion is optional but adds to the versatility of the list by allowing for a varied collection of images. Including this image can initiate or extend the list, affecting the node's execution by potentially increasing the diversity of images processed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`image_2`**
    - Represents the second image to be included in the list. Including this image expands the list and increases the potential for diverse image processing applications. It affects the node's execution by adding more variety to the list, which can influence subsequent image processing tasks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`image_3`**
    - Represents the third image to be included in the list. Its inclusion enhances the list's capacity for handling multiple images in sequence or batch operations. This can affect the node's execution by enabling more complex sequences or batches of images to be processed together.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`image_4`**
    - Represents the fourth image to be included in the list. Adding this image further diversifies the list's content, enabling more complex image-based workflows. It influences the node's execution by contributing to the richness and complexity of the image collection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`image_5`**
    - Represents the fifth image to be included in the list. Its inclusion completes the list, offering a comprehensive set of images for processing or analysis. This affects the node's execution by potentially completing or rounding out the collection of images, which may be critical for certain analyses or processing tasks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`image_list_simple`**
    - An optional pre-existing list of images that can be extended with additional images specified by the other inputs. This parameter allows for the dynamic expansion of the image list based on varying requirements. Including or extending this list directly impacts the node's execution by modifying the initial set of images to be processed, thereby affecting the outcome.
    - Comfy dtype: `IMAGE_LIST_SIMPLE`
    - Python dtype: `Optional[List[torch.Tensor]]`
## Output types
- **`IMAGE_LIST_SIMPLE`**
    - Comfy dtype: `IMAGE_LIST_SIMPLE`
    - The compiled list of images, which may include a combination of individually specified images and those from an existing list. This list is ready for further processing or analysis.
    - Python dtype: `List[torch.Tensor]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the help documentation for this node, offering users guidance on its usage and capabilities.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ImageListSimple:

    @classmethod
    def INPUT_TYPES(cls):
  
        return {"required": {
                },
                "optional": {"image_1": ("IMAGE",),
                             "image_2": ("IMAGE",),
                             "image_3": ("IMAGE",),
                             "image_4": ("IMAGE",),                    
                             "image_5": ("IMAGE",),  
                             "image_list_simple": ("IMAGE_LIST_SIMPLE",)
                },
        }

    RETURN_TYPES = ("IMAGE_LIST_SIMPLE", "STRING", )
    RETURN_NAMES = ("IMAGE_LIST_SIMPLE", "show_help", )
    FUNCTION = "image_list_simple"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def image_list_simple(self,
        image_1=None, image_2=None, image_3=None,  image_4=None, image_5=None,
        image_list_simple=None):

        # Initialise the list
        images = list()
        
        # Extend the list for each image in the stack
        if image_list_simple is not None:
            images.append(l for l in image_list_simple)
        
        if image_1 != None:
            images.append(image_1),

        if image_2 != None:
            images.append(image_2)

        if image_3 != None:
            images.append(image_3)

        if image_4 != None:
            images.append(image_4),
            
        if image_5 != None:
            images.append(image_5),

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-image-list-simple"         

        return (images, show_help, )

```
