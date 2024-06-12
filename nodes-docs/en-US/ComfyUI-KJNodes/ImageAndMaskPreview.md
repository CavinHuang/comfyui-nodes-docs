---
tags:
- Preview
---

# Image & Mask Preview
## Documentation
- Class name: `ImageAndMaskPreview`
- Category: `KJNodes`
- Output node: `True`

The ImageAndMaskPreview node is designed to generate previews of images with optional masks applied. It can adjust the opacity and color of the mask before overlaying it on the image, or simply return the image or mask alone if the other is not provided. This functionality is useful for visually inspecting the effect of masks on images within a workflow.
## Input types
### Required
- **`mask_opacity`**
    - Specifies the opacity level of the mask when it is applied to the image, affecting the visibility of the mask overlay.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mask_color`**
    - Defines the color of the mask in 'R, G, B' format, which is used when both mask and image are provided, to colorize the mask before applying it to the image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pass_through`**
    - Determines whether the processed preview should be returned directly or saved to a file. When true, the preview is returned; otherwise, it is saved.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`image`**
    - The image to which the mask may be applied. If only the image is provided, it is returned as the preview.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The mask to be applied to the image. If only the mask is provided, it is transformed into a preview format.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`composite`**
    - Comfy dtype: `IMAGE`
    - The node returns a composite image when both an image and a mask are provided, applying the mask with specified opacity and color adjustments to the image.
    - Python dtype: `torch.Tensor`
- **`ui`**
    - Provides a UI element displaying the results, including images processed or saved by the node, based on the inputs provided.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageAndMaskPreview(SaveImage):
    def __init__(self):
        self.output_dir = folder_paths.get_temp_directory()
        self.type = "temp"
        self.prefix_append = "_temp_" + ''.join(random.choice("abcdefghijklmnopqrstupvxyz") for x in range(5))
        self.compress_level = 4

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask_opacity": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "mask_color": ("STRING", {"default": "255, 255, 255"}),
                "pass_through": ("BOOLEAN", {"default": False}),
             },
            "optional": {
                "image": ("IMAGE",),
                "mask": ("MASK",),                
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
        }
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("composite",)
    FUNCTION = "execute"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Preview an image or a mask, when both inputs are used  
composites the mask on top of the image.
with pass_through on the preview is disabled and the  
composite is returned from the composite slot instead,  
this allows for the preview to be passed for video combine  
nodes for example.
"""

    def execute(self, mask_opacity, mask_color, pass_through, filename_prefix="ComfyUI", image=None, mask=None, prompt=None, extra_pnginfo=None):
        if mask is not None and image is None:
            preview = mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])).movedim(1, -1).expand(-1, -1, -1, 3)
        elif mask is None and image is not None:
            preview = image
        elif mask is not None and image is not None:
            mask_adjusted = mask * mask_opacity
            mask_image = mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])).movedim(1, -1).expand(-1, -1, -1, 3).clone()

            color_list = list(map(int, mask_color.split(', ')))
            print(color_list[0])
            mask_image[:, :, :, 0] = color_list[0] // 255 # Red channel
            mask_image[:, :, :, 1] = color_list[1] // 255 # Green channel
            mask_image[:, :, :, 2] = color_list[2] // 255 # Blue channel
            
            preview, = ImageCompositeMasked.composite(self, image, mask_image, 0, 0, True, mask_adjusted)
        if pass_through:
            return (preview, )
        return(self.save_images(preview, filename_prefix, prompt, extra_pnginfo))

```
