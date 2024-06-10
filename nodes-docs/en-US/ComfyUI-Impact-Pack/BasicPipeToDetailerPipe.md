---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# BasicPipe -> DetailerPipe
## Documentation
- Class name: `BasicPipeToDetailerPipe`
- Category: `ImpactPack/Pipe`
- Output node: `False`

This node is designed to transform a basic pipeline configuration into a more detailed pipeline configuration, enhancing its capabilities and allowing for more complex operations.
## Input types
### Required
- **`basic_pipe`**
    - The basic pipeline configuration to be transformed into a detailed pipeline configuration. It serves as the foundation for the enhancement process.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[MODEL, CLIP, VAE, CONDITIONING, CONDITIONING]`
- **`bbox_detector`**
    - A bounding box detector component to be included in the detailed pipeline configuration.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `BBOX_DETECTOR`
- **`wildcard`**
    - A wildcard string that allows for dynamic customization of the detailed pipeline configuration.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Select to add LoRA`**
    - Allows the selection of a LoRA component to be added to the detailed pipeline configuration, enhancing its functionality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`Select to add Wildcard`**
    - Enables the selection of an additional wildcard component to be added to the detailed pipeline configuration for further customization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`sam_model_opt`**
    - An optional SAM model component that can be included in the detailed pipeline configuration for enhanced modeling capabilities.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `SAM_MODEL`
- **`segm_detector_opt`**
    - An optional segmentation detector component that can be included in the detailed pipeline configuration for improved segmentation capabilities.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `SEGM_DETECTOR`
- **`detailer_hook`**
    - An optional hook component that can be included in the detailed pipeline configuration for customized processing and enhancements.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `DETAILER_HOOK`
## Output types
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - The resulting detailed pipeline configuration, which includes the basic pipeline components along with the specified enhancements.
    - Python dtype: `Tuple[MODEL, CLIP, VAE, CONDITIONING, CONDITIONING, STRING, BBOX_DETECTOR, SEGM_DETECTOR, SAM_MODEL, DETAILER_HOOK, NoneType, NoneType, NoneType, NoneType]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BasicPipeToDetailerPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"basic_pipe": ("BASIC_PIPE",),
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
        basic_pipe = kwargs['basic_pipe']
        bbox_detector = kwargs['bbox_detector']
        wildcard = kwargs['wildcard']
        sam_model_opt = kwargs.get('sam_model_opt', None)
        segm_detector_opt = kwargs.get('segm_detector_opt', None)
        detailer_hook = kwargs.get('detailer_hook', None)

        model, clip, vae, positive, negative = basic_pipe
        pipe = model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, None, None, None, None
        return (pipe, )

```
