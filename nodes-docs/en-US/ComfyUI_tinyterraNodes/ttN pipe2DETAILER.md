---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# pipe > detailer_pipe
## Documentation
- Class name: `ttN pipe2DETAILER`
- Category: `ttN/pipe`
- Output node: `False`

The ttN pipe2DETAILER node is designed to enhance and detail a given pipeline with additional features and processing steps, incorporating bounding box detection, optional segmentation, and other detailing functionalities to refine the output.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline to be enhanced and detailed, serving as the foundational structure for further processing.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`bbox_detector`**
    - Specifies the bounding box detector to be used for identifying regions of interest within the pipeline's output.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `Callable`
- **`wildcard`**
    - A flexible input for additional specifications or configurations, allowing for custom adjustments to the detailing process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`sam_model_opt`**
    - An optional model for semantic segmentation, providing additional detail through segmentation masks.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `Optional[Callable]`
- **`segm_detector_opt`**
    - An optional segmentation detector to further refine the output with segmentation details.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `Optional[Callable]`
- **`detailer_hook`**
    - A hook for custom detailing functions, enabling further customization of the detailing process.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `Optional[Callable]`
## Output types
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - The enhanced and detailed version of the input pipeline, incorporating additional features and processing steps.
    - Python dtype: `Tuple[Optional[Any], ...]`
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The original pipeline input, returned for reference or further processing.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipe_2DETAILER:
    version = '1.2.0'
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"pipe": ("PIPE_LINE",),
                             "bbox_detector": ("BBOX_DETECTOR", ), 
                             "wildcard": ("STRING", {"multiline": True, "placeholder": "wildcard spec: if kept empty, this option will be ignored"}),
                            },
                "optional": {"sam_model_opt": ("SAM_MODEL", ), 
                             "segm_detector_opt": ("SEGM_DETECTOR",),
                             "detailer_hook": ("DETAILER_HOOK",),
                            },
                "hidden": {"ttNnodeVersion": ttN_pipe_2DETAILER.version},
                }

    RETURN_TYPES = ("DETAILER_PIPE", "PIPE_LINE" )
    RETURN_NAMES = ("detailer_pipe", "pipe")
    FUNCTION = "flush"

    CATEGORY = "ttN/pipe"

    def flush(self, pipe, bbox_detector, wildcard, sam_model_opt=None, segm_detector_opt=None, detailer_hook=None):
        detailer_pipe = (pipe.get('model'), pipe.get('clip'), pipe.get('vae'), pipe.get('positive'), pipe.get('negative'), wildcard,
                         bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, None, None, None, None)
        return (detailer_pipe, pipe, )

```
