---
tags:
- Image
- ImageSave
---

# imageOutput
## Documentation
- Class name: `ttN imageOutput`
- Category: `ttN/image`
- Output node: `True`

The ttN_imageOutput node is designed to manage image output processes within a custom pipeline, focusing on the high-level management of image saving, displaying, and modifications according to user-defined settings. It abstracts the complexities involved in image handling, offering a streamlined interface for operations related to image outputs.
## Input types
### Required
- **`image`**
    - Serves as the central input for operations like saving or modifying, central to the node's processing activities.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_output`**
    - Determines the handling of the image output, including saving, hiding, or displaying options.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`output_path`**
    - Specifies the directory path where images are saved, central to organizing saved images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`save_prefix`**
    - A prefix added to saved images, aiding in their organization and retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`number_padding`**
    - Defines the padding used for numbering saved images, aiding in their systematic organization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `int`
- **`file_type`**
    - Determines the file format for saved images, influencing the compatibility and quality of outputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`overwrite_existing`**
    - Controls whether existing images should be overwritten, affecting how new images are stored.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`embed_workflow`**
    - Indicates whether the workflow information should be embedded in the saved images, enhancing traceability.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the processed image, either as modified or in its original form, depending on the operation.
    - Python dtype: `torch.Tensor`
- **`ui`**
    - Outputs the processed image results to the UI, facilitating user interaction and visualization.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_imageOUPUT:
        version = '1.1.0'
        def __init__(self):
            pass
        
        @classmethod
        def INPUT_TYPES(s):
            return {"required": { 
                    "image": ("IMAGE",),
                    "image_output": (["Hide", "Preview", "Save", "Hide/Save"],{"default": "Preview"}),
                    "output_path": ("STRING", {"default": folder_paths.get_output_directory(), "multiline": False}),
                    "save_prefix": ("STRING", {"default": "ComfyUI"}),
                    "number_padding": (["None", 2, 3, 4, 5, 6, 7, 8, 9],{"default": 5}),
                    "file_type": (["PNG", "JPG", "JPEG", "BMP", "TIFF", "TIF"],{"default": "PNG"}),
                    "overwrite_existing": (["True", "False"],{"default": "False"}),
                    "embed_workflow": (["True", "False"],),

                    },
                    "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                               "ttNnodeVersion": ttN_imageOUPUT.version},
                }

        RETURN_TYPES = ("IMAGE",)
        RETURN_NAMES = ("image",)
        FUNCTION = "output"
        CATEGORY = "ttN/image"
        OUTPUT_NODE = True

        def output(self, image, image_output, output_path, save_prefix, number_padding, file_type, overwrite_existing, embed_workflow, prompt, extra_pnginfo, my_unique_id):
            ttN_save = ttNsave(my_unique_id, prompt, extra_pnginfo, number_padding, overwrite_existing, output_path)
            results = ttN_save.images(image, save_prefix, image_output, embed_workflow, file_type.lower())

            if image_output in ("Hide", "Hide/Save"):
                return (image,)

            # Output image results to ui and node outputs
            return {"ui": {"images": results},
                    "result": (image,)}

```
