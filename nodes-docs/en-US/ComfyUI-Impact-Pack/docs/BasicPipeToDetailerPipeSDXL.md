---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# BasicPipe -> DetailerPipe (SDXL)
## Documentation
- Class name: `BasicPipeToDetailerPipeSDXL`
- Category: `ImpactPack/Pipe`
- Output node: `False`

This node is designed to transform a basic pipeline configuration into a more detailed pipeline configuration specifically tailored for the SDXL model. It enriches the basic pipeline by incorporating additional models, clips, VAEs, and conditioning parameters, along with optional elements like SAM models and segmentation detectors, to enhance the detail and precision of the output.
## Input types
### Required
- **`base_basic_pipe`**
    - unknown
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `unknown`
- **`refiner_basic_pipe`**
    - unknown
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `unknown`
- **`bbox_detector`**
    - A bounding box detector model that identifies and locates objects within images, useful for targeted manipulations or enhancements.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `str`
- **`wildcard`**
    - A flexible string input that can be used for dynamic prompts or additional instructions not covered by other parameters.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Select to add LoRA`**
    - Allows the selection of LoRA layers to be added to the text, enhancing the model's ability to adapt to specific tasks or domains.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`Select to add Wildcard`**
    - Enables the selection of predefined wildcards to be added to the text, offering more control over the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`sam_model_opt`**
    - An optional SAM model that can be used for sharpening and adjusting the focus of generated images, improving their clarity.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `str`
- **`segm_detector_opt`**
    - An optional segmentation detector that can be used for identifying and segmenting specific parts of images, useful for detailed manipulations.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `str`
- **`detailer_hook`**
    - An optional hook that allows for custom modifications or enhancements to the detailing process, providing flexibility in the pipeline's behavior.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `str`
## Output types
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - The detailed pipeline configuration resulting from the transformation, tailored for the SDXL model.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BasicPipeToDetailerPipeSDXL:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"base_basic_pipe": ("BASIC_PIPE",),
                             "refiner_basic_pipe": ("BASIC_PIPE",),
                             "bbox_detector": ("BBOX_DETECTOR", ),
                             "wildcard": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                             "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"),),
                             "Select to add Wildcard": (["Select the Wildcard to add to the text"],),
                             },
                "optional": {
                    "sam_model_opt": ("SAM_MODEL", ),
                    "segm_detector_opt": ("SEGM_DETECTOR",),
                    "detailer_hook": ("DETAILER_HOOK",),
                    },
                }

    RETURN_TYPES = ("DETAILER_PIPE", )
    RETURN_NAMES = ("detailer_pipe", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, *args, **kwargs):
        base_basic_pipe = kwargs['base_basic_pipe']
        refiner_basic_pipe = kwargs['refiner_basic_pipe']
        bbox_detector = kwargs['bbox_detector']
        wildcard = kwargs['wildcard']
        sam_model_opt = kwargs.get('sam_model_opt', None)
        segm_detector_opt = kwargs.get('segm_detector_opt', None)
        detailer_hook = kwargs.get('detailer_hook', None)

        model, clip, vae, positive, negative = base_basic_pipe
        refiner_model, refiner_clip, refiner_vae, refiner_positive, refiner_negative = refiner_basic_pipe
        pipe = model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, refiner_model, refiner_clip, refiner_positive, refiner_negative
        return (pipe, )

```
