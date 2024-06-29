---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# Edit DetailerPipe
## Documentation
- Class name: `EditDetailerPipe`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The EditDetailerPipe node is designed to enhance and detail the editing process by allowing the integration of various editing components such as LoRA, Wildcards, and models for refining the output. It serves as a foundational element in constructing detailed and customized editing pipelines.
## Input types
### Required
- **`detailer_pipe`**
    - Represents the core pipeline for detailing, serving as the primary input around which additional detailing components are integrated.
    - Comfy dtype: `DETAILER_PIPE`
    - Python dtype: `tuple`
- **`wildcard`**
    - Allows for the inclusion of dynamic, multiline text inputs, known as wildcards, to add flexibility and customization to the editing process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Select to add LoRA`**
    - Enables the selection of LoRA (Locally Optimized Receptive Attention) components to be added to the text, enhancing its detail and specificity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`Select to add Wildcard`**
    - Facilitates the selection of predefined wildcards to be incorporated into the text, adding layers of customization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
### Optional
- **`model`**
    - Specifies the model to be used in the detailing process, allowing for customization and refinement of outputs.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`clip`**
    - Defines the CLIP model to be integrated into the detailing process for enhanced content understanding and generation.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`vae`**
    - Specifies the VAE model to be used, enabling advanced image processing capabilities in the detailing process.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`positive`**
    - Defines positive conditioning factors to guide the detailing process towards desired outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Specifies negative conditioning factors to avoid certain outcomes in the detailing process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`bbox_detector`**
    - Integrates a bounding box detector for object localization in images, enhancing the detailing capabilities.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `str`
- **`sam_model`**
    - Specifies the SAM model to be used, enabling advanced semantic understanding and manipulation.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `str`
- **`segm_detector`**
    - Integrates a segmentation detector for detailed image segmentation, enhancing the editing capabilities.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `str`
- **`detailer_hook`**
    - Allows for the integration of custom hooks into the detailing process, enabling further customization.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `str`
## Output types
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - Outputs the enhanced detailer pipe, incorporating all specified modifications and integrations.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [FaceDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/FaceDetailerPipe.md)



## Source code
```python
class EditDetailerPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "detailer_pipe": ("DETAILER_PIPE",),
                "wildcard": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"),),
                "Select to add Wildcard": (["Select the Wildcard to add to the text"],),
            },
            "optional": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "vae": ("VAE",),
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
                "bbox_detector": ("BBOX_DETECTOR",),
                "sam_model": ("SAM_MODEL",),
                "segm_detector": ("SEGM_DETECTOR",),
                "detailer_hook": ("DETAILER_HOOK",),
            },
        }

    RETURN_TYPES = ("DETAILER_PIPE",)
    RETURN_NAMES = ("detailer_pipe",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, *args, **kwargs):
        detailer_pipe = kwargs['detailer_pipe']
        wildcard = kwargs['wildcard']
        model = kwargs.get('model', None)
        clip = kwargs.get('clip', None)
        vae = kwargs.get('vae', None)
        positive = kwargs.get('positive', None)
        negative = kwargs.get('negative', None)
        bbox_detector = kwargs.get('bbox_detector', None)
        sam_model = kwargs.get('sam_model', None)
        segm_detector = kwargs.get('segm_detector', None)
        detailer_hook = kwargs.get('detailer_hook', None)
        refiner_model = kwargs.get('refiner_model', None)
        refiner_clip = kwargs.get('refiner_clip', None)
        refiner_positive = kwargs.get('refiner_positive', None)
        refiner_negative = kwargs.get('refiner_negative', None)

        res_model, res_clip, res_vae, res_positive, res_negative, res_wildcard, res_bbox_detector, res_segm_detector, res_sam_model, res_detailer_hook, res_refiner_model, res_refiner_clip, res_refiner_positive, res_refiner_negative = detailer_pipe

        if model is not None:
            res_model = model

        if clip is not None:
            res_clip = clip

        if vae is not None:
            res_vae = vae

        if positive is not None:
            res_positive = positive

        if negative is not None:
            res_negative = negative

        if bbox_detector is not None:
            res_bbox_detector = bbox_detector

        if segm_detector is not None:
            res_segm_detector = segm_detector

        if wildcard != "":
            res_wildcard = wildcard

        if sam_model is not None:
            res_sam_model = sam_model

        if detailer_hook is not None:
            res_detailer_hook = detailer_hook

        if refiner_model is not None:
            res_refiner_model = refiner_model

        if refiner_clip is not None:
            res_refiner_clip = refiner_clip

        if refiner_positive is not None:
            res_refiner_positive = refiner_positive

        if refiner_negative is not None:
            res_refiner_negative = refiner_negative

        pipe = (res_model, res_clip, res_vae, res_positive, res_negative, res_wildcard,
                res_bbox_detector, res_segm_detector, res_sam_model, res_detailer_hook,
                res_refiner_model, res_refiner_clip, res_refiner_positive, res_refiner_negative)

        return (pipe, )

```
