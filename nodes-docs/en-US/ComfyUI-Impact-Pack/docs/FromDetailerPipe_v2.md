---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# FromDetailerPipe_v2
## Documentation
- Class name: `FromDetailerPipe_v2`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The `FromDetailerPipe_v2` node is designed to decompose a complex detailer pipe structure into its constituent components, facilitating the extraction and individual manipulation of each component for further processing or analysis.
## Input types
### Required
- **`detailer_pipe`**
    - Represents the complex structure of a detailer pipe, encapsulating various models and processing elements. It is essential for the node to dissect and provide access to individual components.
    - Comfy dtype: `DETAILER_PIPE`
    - Python dtype: `tuple`
## Output types
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - Returns the original detailer pipe structure, allowing for potential reassembly or further reference.
    - Python dtype: `tuple`
- **`model`**
    - Comfy dtype: `MODEL`
    - Extracts the primary model component from the detailer pipe.
    - Python dtype: `object`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Retrieves the CLIP model component, used for image-text matching and manipulation.
    - Python dtype: `object`
- **`vae`**
    - Comfy dtype: `VAE`
    - Extracts the Variational Autoencoder (VAE) component, crucial for image generation and manipulation.
    - Python dtype: `object`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Provides access to the positive conditioning component, essential for guiding the generation process.
    - Python dtype: `object`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Provides access to the negative conditioning component, essential for guiding the generation process.
    - Python dtype: `object`
- **`bbox_detector`**
    - Comfy dtype: `BBOX_DETECTOR`
    - Extracts the bounding box detector component, used for object detection within images.
    - Python dtype: `object`
- **`sam_model_opt`**
    - Comfy dtype: `SAM_MODEL`
    - Retrieves the optional SAM model component, enhancing image quality and detail.
    - Python dtype: `object`
- **`segm_detector_opt`**
    - Comfy dtype: `SEGM_DETECTOR`
    - Extracts the optional segmentation detector component, used for detailed image segmentation.
    - Python dtype: `object`
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Provides access to the detailer hook component, allowing for custom modifications and enhancements.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [FaceDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/FaceDetailerPipe.md)



## Source code
```python
class FromDetailerPipe_v2:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"detailer_pipe": ("DETAILER_PIPE",), }, }

    RETURN_TYPES = ("DETAILER_PIPE", "MODEL", "CLIP", "VAE", "CONDITIONING", "CONDITIONING", "BBOX_DETECTOR", "SAM_MODEL", "SEGM_DETECTOR", "DETAILER_HOOK")
    RETURN_NAMES = ("detailer_pipe", "model", "clip", "vae", "positive", "negative", "bbox_detector", "sam_model_opt", "segm_detector_opt", "detailer_hook")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Pipe"

    def doit(self, detailer_pipe):
        model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, _, _, _, _ = detailer_pipe
        return detailer_pipe, model, clip, vae, positive, negative, bbox_detector, sam_model_opt, segm_detector_opt, detailer_hook

```
