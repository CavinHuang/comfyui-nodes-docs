---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# FromDetailerPipe
## Documentation
- Class name: `FromDetailerPipe`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The FromDetailerPipe node is designed to extract and return various components from a given detailer pipe, including models, clips, VAEs, conditioning information, bounding box detectors, SAM models, segmentation detectors, and detailer hooks. This node facilitates the decomposition of a complex detailer pipe into its constituent elements for further processing or analysis.
## Input types
### Required
- **`detailer_pipe`**
    - Represents the detailer pipe from which various components are extracted. It is crucial for the operation as it contains all the elements that need to be decomposed and returned individually.
    - Comfy dtype: `DETAILER_PIPE`
    - Python dtype: `Tuple[torch.Tensor, ...]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the model component extracted from the detailer pipe, essential for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Returns the clip component extracted from the detailer pipe, essential for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`vae`**
    - Comfy dtype: `VAE`
    - Returns the VAE component extracted from the detailer pipe, essential for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Returns the positive conditioning information extracted from the detailer pipe, essential for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Returns the negative conditioning information extracted from the detailer pipe, essential for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`bbox_detector`**
    - Comfy dtype: `BBOX_DETECTOR`
    - Returns the bounding box detector component extracted from the detailer pipe, essential for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`sam_model_opt`**
    - Comfy dtype: `SAM_MODEL`
    - Returns the SAM model component extracted from the detailer pipe, essential for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`segm_detector_opt`**
    - Comfy dtype: `SEGM_DETECTOR`
    - Returns the segmentation detector component extracted from the detailer pipe, essential for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Returns the detailer hook component extracted from the detailer pipe, essential for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [DetailerForEachDebug](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebug.md)
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



## Source code
```python
class FromDetailerPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"detailer_pipe": ("DETAILER_PIPE",), }, }

    RETURN_TYPES = ("MODEL", "CLIP", "VAE", "CONDITIONING", "CONDITIONING", "BBOX_DETECTOR", "SAM_MODEL", "SEGM_DETECTOR", "DETAILER_HOOK")
    RETURN_NAMES = ("model", "clip", "vae", "positive", "negative", "bbox_detector", "sam_model_opt", "segm_detector_opt", "detailer_hook")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, detailer_pipe):
        model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, _, _, _, _ = detailer_pipe
        return model, clip, vae, positive, negative, bbox_detector, sam_model_opt, segm_detector_opt, detailer_hook

```
