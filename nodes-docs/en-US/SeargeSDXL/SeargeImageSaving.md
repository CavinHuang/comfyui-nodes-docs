---
tags:
- Image
- ImageSave
---

# Image Saving v2
## Documentation
- Class name: `SeargeImageSaving`
- Category: `Searge/UI/Inputs`
- Output node: `False`

This node is designed for the purpose of saving images during various stages of image generation and processing. It handles the intricacies of saving original, high-resolution, and upscaled images based on specific conditions and settings, ensuring that the images are stored correctly and efficiently.
## Input types
### Required
- **`save_parameters_file`**
    - Determines whether the parameters file should be saved, impacting the node's operation by enabling or disabling the saving of parameter configurations.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`save_folder`**
    - Specifies the folder where images and related files should be saved, influencing the node's behavior in terms of organizing saved outputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`save_generated_image`**
    - Controls the saving of generated images, playing a crucial role in the node's operation by dictating whether or not these images are persisted.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`embed_workflow_in_generated`**
    - Determines whether the workflow information should be embedded in generated images, affecting the node's functionality by enabling or disabling the embedding of workflow metadata.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`generated_image_name`**
    - Specifies the name for generated images, influencing how saved images are named and organized.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`save_high_res_image`**
    - Determines the saving of high-resolution images, affecting the node's functionality by enabling or disabling the saving of these images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`embed_workflow_in_high_res`**
    - Decides if workflow information should be embedded in high-resolution images, impacting the node's behavior by enabling or disabling the embedding of workflow metadata in high-res images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`high_res_image_name`**
    - Specifies the name for high-resolution images, influencing how these images are named and organized upon saving.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`save_upscaled_image`**
    - Controls the saving of upscaled images, impacting the node's behavior by dictating the saving process of upscaled images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`embed_workflow_in_upscaled`**
    - Determines whether workflow information should be embedded in upscaled images, affecting the node's functionality by enabling or disabling the embedding of workflow metadata in upscaled images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`upscaled_image_name`**
    - Specifies the name for upscaled images, influencing how these images are named and organized.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`data`**
    - An optional parameter that allows passing additional data through the node, potentially affecting its operation based on the provided data.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `dict`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Returns the modified data with image saving settings applied, facilitating further processing or utilization downstream.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeImageSaving:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "save_parameters_file": ("BOOLEAN", {"default": True},),
                "save_folder": (UI.SAVE_FOLDERS, {"default": UI.SAVE_TO_OUTPUT_DATE, },),
                "save_generated_image": ("BOOLEAN", {"default": True},),
                "embed_workflow_in_generated": ("BOOLEAN", {"default": True},),
                "generated_image_name": ("STRING", {"multiline": False, "default": "generated", },),
                "save_high_res_image": ("BOOLEAN", {"default": True},),
                "embed_workflow_in_high_res": ("BOOLEAN", {"default": True},),
                "high_res_image_name": ("STRING", {"multiline": False, "default": "high-res", },),
                "save_upscaled_image": ("BOOLEAN", {"default": True},),
                "embed_workflow_in_upscaled": ("BOOLEAN", {"default": True},),
                "upscaled_image_name": ("STRING", {"multiline": False, "default": "upscaled", },),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "get"

    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(save_parameters_file, save_folder,
                    save_generated_image, embed_workflow_in_generated, generated_image_name,
                    save_high_res_image, embed_workflow_in_high_res, high_res_image_name,
                    save_upscaled_image, embed_workflow_in_upscaled, upscaled_image_name):
        return {
            UI.F_SAVE_PARAMETERS_FILE: save_parameters_file is not None and save_parameters_file,
            UI.F_SAVE_FOLDER: save_folder,
            UI.F_SAVE_GENERATED_IMAGE: save_generated_image is not None and save_generated_image,
            UI.F_EMBED_WORKFLOW_IN_GENERATED: embed_workflow_in_generated is not None and embed_workflow_in_generated,
            UI.F_GENERATED_IMAGE_NAME: generated_image_name,
            UI.F_SAVE_HIGH_RES_IMAGE: save_high_res_image is not None and save_high_res_image,
            UI.F_EMBED_WORKFLOW_IN_HIGH_RES: embed_workflow_in_high_res is not None and embed_workflow_in_high_res,
            UI.F_HIGH_RES_IMAGE_NAME: high_res_image_name,
            UI.F_SAVE_UPSCALED_IMAGE: save_upscaled_image is not None and save_upscaled_image,
            UI.F_EMBED_WORKFLOW_IN_UPSCALED: embed_workflow_in_upscaled is not None and embed_workflow_in_upscaled,
            UI.F_UPSCALED_IMAGE_NAME: upscaled_image_name,
        }

    def get(self, save_parameters_file, save_folder,
            save_generated_image, embed_workflow_in_generated, generated_image_name,
            save_high_res_image, embed_workflow_in_high_res, high_res_image_name,
            save_upscaled_image, embed_workflow_in_upscaled, upscaled_image_name, data=None):
        if data is None:
            data = {}

        data[UI.S_IMAGE_SAVING] = self.create_dict(
            save_parameters_file,
            save_folder,
            save_generated_image,
            embed_workflow_in_generated,
            generated_image_name,
            save_high_res_image,
            embed_workflow_in_high_res,
            high_res_image_name,
            save_upscaled_image,
            embed_workflow_in_upscaled,
            upscaled_image_name,
        )

        return (data,)

```
