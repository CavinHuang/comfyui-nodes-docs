---
tags:
- Image
- ImageListLoader
---

# CR Image List (Legacy)
## Documentation
- Class name: `CR Image List`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

The CR Image List node is designed to load and process a list of images from a specified directory, converting them into a format suitable for further manipulation or analysis. It focuses on organizing and preparing image data by ensuring the images are in a consistent format and facilitating their use in subsequent operations.
## Input types
### Required
### Optional
- **`image_1`**
    - Specifies the first image to be processed. This parameter is part of a series that allows for the loading and processing of multiple images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`alias1`**
    - An alias for the first image, providing a means to reference it more conveniently in subsequent operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image_2`**
    - Specifies the second image to be processed, following the same pattern as the first.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`alias2`**
    - An alias for the second image, aiding in its identification and use in later stages.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image_3`**
    - Specifies the third image to be processed, continuing the sequence of image inputs.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`alias3`**
    - An alias for the third image, facilitating easier reference and manipulation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image_4`**
    - Specifies the fourth image to be processed, extending the list of images to be handled.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`alias4`**
    - An alias for the fourth image, simplifying its identification and subsequent processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image_5`**
    - Specifies the fifth image to be processed, completing the series of image inputs.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`alias5`**
    - An alias for the fifth image, making it easier to refer to and work with in further operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image_list`**
    - A list parameter that allows for the bulk loading and processing of images, accommodating larger sets of image data.
    - Comfy dtype: `image_LIST`
    - Python dtype: `List[str]`
## Output types
- **`IMAGE_LIST`**
    - Comfy dtype: `IMAGE_LIST`
    - A list of images that have been loaded and converted to a consistent format, ready for further processing or analysis.
    - Python dtype: `List[torch.Tensor]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a link to helpful documentation or resources related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ImageList:

    @classmethod
    def INPUT_TYPES(cls):
    
        return {"required": {
                },
                "optional": {"image_1": ("IMAGE",),
                             "alias1": ("STRING", {"multiline": False, "default": ""}),
                             "image_2": ("IMAGE",),
                             "alias2": ("STRING", {"multiline": False, "default": ""}),
                             "image_3": ("IMAGE",),
                             "alias3": ("STRING", {"multiline": False, "default": ""}),
                             "image_4": ("IMAGE",),
                             "alias4": ("STRING", {"multiline": False, "default": ""}),                    
                             "image_5": ("IMAGE",),
                             "alias5": ("STRING", {"multiline": False, "default": ""}),
                             "image_list": ("image_LIST",)
                },
        }

    RETURN_TYPES = ("IMAGE_LIST", "STRING", )
    RETURN_NAMES = ("IMAGE_LIST", "show_help", )
    FUNCTION = "image_list"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def image_list(self,
        image_1=None, alias1=None,
        image_2=None, alias2=None,
        image_3=None, alias3=None,
        image_4=None, alias4=None,
        image_5=None, alias5=None,
        image_list=None):

        # Initialise the list
        images = list()
        
        # Extend the list for each image in the stack
        if image_list is not None:
            image_tup = [(alias1, image_1)] 
            images.extend([l for l in image_list])
        
        if image_1 != None:
            images.extend([(alias1, image_1)]),

        if image_2 != None:
            images.extend([(alias2, image_2)]), 

        if image_3 != None:
            images.extend([(alias3, image_3)]),           

        if image_4 != None:
            images.extend([(alias4, image_4)]), 
            
        if image_5 != None:
            images.extend([(alias5, image_5)]),

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-image-list"          

        return (images, show_help, )   

```
