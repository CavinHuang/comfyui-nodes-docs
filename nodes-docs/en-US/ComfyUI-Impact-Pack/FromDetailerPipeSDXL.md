---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# FromDetailer (SDXL/pipe)
## Documentation
- Class name: `FromDetailerPipeSDXL`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The FromDetailerPipeSDXL node is designed to extract and return various components from a detailer pipe, including models, clips, VAEs, conditioning elements, bounding box detectors, SAM models, segmentation detectors, and detailer hooks. It serves as a mechanism to decompose a complex detailer pipe into its constituent parts for further processing or analysis.
## Input types
### Required
- **`detailer_pipe`**
    - Represents the detailer pipe from which components are to be extracted. It is crucial for specifying the source of the data to be decomposed.
    - Comfy dtype: `DETAILER_PIPE`
    - Python dtype: `Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, str, str, str, torch.nn.Module, torch.nn.Module, torch.nn.Module, torch.nn.Module, torch.nn.Module, torch.nn.Module, str, str]`
## Output types
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - Returns the entire detailer pipe as received, allowing for further manipulation or analysis.
    - Python dtype: `Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, str, str, str, torch.nn.Module, torch.nn.Module, torch.nn.Module, torch.nn.Module, torch.nn.Module, torch.nn.Module, str, str]`
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the model component extracted from the detailer pipe.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Returns the clip component extracted from the detailer pipe.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - Returns the VAE component extracted from the detailer pipe.
    - Python dtype: `torch.nn.Module`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Returns the positive conditioning element extracted from the detailer pipe.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Returns the negative conditioning element extracted from the detailer pipe.
    - Python dtype: `str`
- **`bbox_detector`**
    - Comfy dtype: `BBOX_DETECTOR`
    - Returns the bounding box detector component extracted from the detailer pipe.
    - Python dtype: `torch.nn.Module`
- **`sam_model_opt`**
    - Comfy dtype: `SAM_MODEL`
    - Returns the SAM model component extracted from the detailer pipe, if available.
    - Python dtype: `torch.nn.Module`
- **`segm_detector_opt`**
    - Comfy dtype: `SEGM_DETECTOR`
    - Returns the segmentation detector component extracted from the detailer pipe, if available.
    - Python dtype: `torch.nn.Module`
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Returns the detailer hook component extracted from the detailer pipe.
    - Python dtype: `torch.nn.Module`
- **`refiner_model`**
    - Comfy dtype: `MODEL`
    - Returns the refiner model component extracted from the detailer pipe.
    - Python dtype: `torch.nn.Module`
- **`refiner_clip`**
    - Comfy dtype: `CLIP`
    - Returns the refiner clip component extracted from the detailer pipe.
    - Python dtype: `torch.nn.Module`
- **`refiner_positive`**
    - Comfy dtype: `CONDITIONING`
    - Returns the refiner positive conditioning element extracted from the detailer pipe.
    - Python dtype: `str`
- **`refiner_negative`**
    - Comfy dtype: `CONDITIONING`
    - Returns the refiner negative conditioning element extracted from the detailer pipe.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromDetailerPipe_SDXL:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"detailer_pipe": ("DETAILER_PIPE",), }, }

    RETURN_TYPES = ("DETAILER_PIPE", "MODEL", "CLIP", "VAE", "CONDITIONING", "CONDITIONING", "BBOX_DETECTOR", "SAM_MODEL", "SEGM_DETECTOR", "DETAILER_HOOK", "MODEL", "CLIP", "CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("detailer_pipe", "model", "clip", "vae", "positive", "negative", "bbox_detector", "sam_model_opt", "segm_detector_opt", "detailer_hook", "refiner_model", "refiner_clip", "refiner_positive", "refiner_negative")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, detailer_pipe):
        model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, refiner_model, refiner_clip, refiner_positive, refiner_negative = detailer_pipe
        return detailer_pipe, model, clip, vae, positive, negative, bbox_detector, sam_model_opt, segm_detector_opt, detailer_hook, refiner_model, refiner_clip, refiner_positive, refiner_negative

```
