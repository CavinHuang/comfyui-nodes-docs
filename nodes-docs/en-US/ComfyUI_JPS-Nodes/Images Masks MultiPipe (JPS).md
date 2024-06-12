---
tags:
- Image
---

# Images Masks MultiPipe (JPS)
## Documentation
- Class name: `Images Masks MultiPipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The Images Masks MultiPipe node is designed to facilitate the processing and manipulation of images and masks within a pipeline, enabling operations such as generation, revision, and inpainting with the support of a model. It serves as a versatile component in workflows that require the handling of visual data and its associated masks, streamlining tasks that involve image generation, modification, and enhancement.
## Input types
### Required
### Optional
- **`generation_img`**
    - Specifies the initial image for generation processes, setting the stage for subsequent image manipulations or enhancements.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`generation_mask`**
    - Defines the mask associated with the generation image, used for guiding or restricting certain operations within the image processing pipeline.
    - Comfy dtype: `MASK`
    - Python dtype: `MASK`
- **`ipa1_img`**
    - Represents the first image processed through an intermediate pipeline action, contributing to the multi-step image manipulation workflow.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`ipa2_img`**
    - Denotes the second image resulting from an intermediate pipeline action, furthering the progression of image processing tasks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`ipa1_mask`**
    - Serves as the mask for the first intermediate pipeline action image, aiding in targeted image modifications or enhancements.
    - Comfy dtype: `MASK`
    - Python dtype: `MASK`
- **`ipa2_mask`**
    - Acts as the mask for the second intermediate pipeline action image, facilitating precise control over image alterations.
    - Comfy dtype: `MASK`
    - Python dtype: `MASK`
- **`revision1_img`**
    - Indicates the first revised image, showcasing the application of modifications or improvements post initial generation or processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`revision2_img`**
    - Signifies the second revised image, illustrating further adjustments or refinements made after the initial set of revisions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`inpaint_model`**
    - Incorporates a model to support inpainting tasks, enabling the restoration or completion of images based on the provided masks.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
## Output types
- **`generation_img`**
    - Comfy dtype: `IMAGE`
    - Outputs the generated image after processing through the pipeline.
    - Python dtype: `IMAGE`
- **`generation_mask`**
    - Comfy dtype: `MASK`
    - Outputs the mask associated with the generated image, reflecting any modifications or enhancements made.
    - Python dtype: `MASK`
- **`ipa1_img`**
    - Comfy dtype: `IMAGE`
    - Outputs the first intermediate processed image, after undergoing specific pipeline actions.
    - Python dtype: `IMAGE`
- **`ipa2_img`**
    - Comfy dtype: `IMAGE`
    - Outputs the second intermediate processed image, showcasing further processing steps.
    - Python dtype: `IMAGE`
- **`ipa1_mask`**
    - Comfy dtype: `MASK`
    - Outputs the mask for the first intermediate processed image, indicating areas of focus or restriction.
    - Python dtype: `MASK`
- **`ipa2_mask`**
    - Comfy dtype: `MASK`
    - Outputs the mask for the second intermediate processed image, guiding further image modifications.
    - Python dtype: `MASK`
- **`revision1_img`**
    - Comfy dtype: `IMAGE`
    - Outputs the first revised image, after applying modifications or enhancements.
    - Python dtype: `IMAGE`
- **`revision2_img`**
    - Comfy dtype: `IMAGE`
    - Outputs the second revised image, reflecting additional adjustments or refinements.
    - Python dtype: `IMAGE`
- **`inpaint_model`**
    - Comfy dtype: `MODEL`
    - Provides the model used for inpainting tasks, facilitating the restoration or completion of images.
    - Python dtype: `MODEL`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Images_Masks_MultiPipe:

    CATEGORY = 'JPS Nodes/Pipes'
    RETURN_TYPES = ("IMAGE","MASK","IMAGE","IMAGE","MASK","MASK","IMAGE","IMAGE","MODEL",)
    RETURN_NAMES = ("generation_img","generation_mask","ipa1_img","ipa2_img","ipa1_mask","ipa2_mask","revision1_img","revision2_img","inpaint_model",)
    FUNCTION = "get_imagemask"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "generation_img": ("IMAGE",),
                "generation_mask": ("MASK",),
                "ipa1_img": ("IMAGE",),
                "ipa2_img": ("IMAGE",),
                "ipa1_mask": ("MASK",),
                "ipa2_mask": ("MASK",),
                "revision1_img": ("IMAGE",),
                "revision2_img": ("IMAGE",),
                "inpaint_model": ("MODEL",),
            }
        }

    def get_imagemask(self,generation_img=None,generation_mask=None,ipa1_img=None,ipa2_img=None,ipa1_mask=None,ipa2_mask=None,revision1_img=None,revision2_img=None,inpaint_model=None,):
        
        return (generation_img,generation_mask,ipa1_img,ipa2_img,ipa1_mask,ipa2_mask,revision1_img,revision2_img,inpaint_model,)

```
