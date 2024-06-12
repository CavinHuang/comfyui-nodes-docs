---
tags:
- Face
---

# SpectreFaceReconLoader
## Documentation
- Class name: `SpectreFaceReconLoader`
- Category: `MotionDiff`
- Output node: `False`

The SpectreFaceReconLoader node is designed to initialize and load the Spectre model along with a face tracker for facial recognition tasks. It prepares the model for subsequent operations by downloading necessary models and setting configuration parameters, ensuring the system is ready for face tracking and recognition within images or video streams.
## Input types
### Required
- **`fp16`**
    - Determines whether the model should be loaded in half-precision (FP16) format, which can reduce memory usage and potentially increase performance on compatible hardware.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`spectre_model`**
    - Comfy dtype: `SPECTRE_MODEL`
    - Returns a tuple containing the initialized face tracker and Spectre model, ready for facial recognition tasks.
    - Python dtype: `Tuple[FaceTracker, SPECTRE]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SpectreFaceReconLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"fp16": ("BOOLEAN", {"default": False})}
        }

    RETURN_TYPES = ("SPECTRE_MODEL", )
    FUNCTION = "load"
    CATEGORY = "MotionDiff"

    def load(self, fp16):
        face_tracker = FaceTracker(get_torch_device())
        download_models({"spectre_model.tar": "https://github.com/Fannovel16/ComfyUI-MotionDiff/releases/download/latest/spectre_model.tar"})
        spectre_cfg.pretrained_modelpath = str(CKPT_DIR_PATH / "spectre_model.tar")
        spectre_cfg.model.use_tex = False
        spectre = SPECTRE(spectre_cfg, get_torch_device())
        spectre.eval()
        return ((face_tracker, spectre), )

```
