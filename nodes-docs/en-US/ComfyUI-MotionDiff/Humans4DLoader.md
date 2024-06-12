---
tags:
- Face
---

# Human4D Loader
## Documentation
- Class name: `Humans4DLoader`
- Category: `MotionDiff`
- Output node: `False`

The Humans4DLoader node is designed to load and prepare 4D human models for further processing or analysis. It handles the downloading of necessary models and configurations, setting up the models for execution, and ensuring they are ready for use in tasks such as motion analysis or 3D reconstruction.
## Input types
### Required
- **`detector`**
    - Specifies the detector model to be used for identifying humans in images. The choice of detector can influence the accuracy and performance of human detection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`fp16`**
    - Indicates whether to use half-precision floating-point format (FP16) for the model, potentially improving performance on compatible hardware.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`human4d_model`**
    - Comfy dtype: `HUMAN4D_MODEL`
    - The output is a structured object containing the loaded 4D human model, its configuration, and the detector, ready for further processing.
    - Python dtype: `SimpleNamespace`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Humans4DLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "detector": (["person_yolov8m-seg.pt", "person_yolov8s-seg.pt", "yolov8x.pt", "yolov9c.pt", "yolov9e.pt"], {"default": "person_yolov8m-seg.pt"}), 
                "fp16": ("BOOLEAN", {"default": False}) 
            }
        }

    RETURN_TYPES = ("HUMAN4D_MODEL", )
    FUNCTION = "load"
    CATEGORY = "MotionDiff"

    def load(self, detector, fp16):
        url_prefix = "https://github.com/ultralytics/assets/releases/latest/download/"
        if "person" in detector:
            url_prefix = "https://huggingface.co/Bingsu/adetailer/resolve/main/" 
        download_models({
            detector: url_prefix+detector, 
            "model_config.yaml": "https://huggingface.co/spaces/brjathu/HMR2.0/raw/main/logs/train/multiruns/hmr2/0/model_config.yaml",
            "epoch=35-step=1000000.ckpt": "https://huggingface.co/spaces/brjathu/HMR2.0/resolve/main/logs/train/multiruns/hmr2/0/checkpoints/epoch%3D35-step%3D1000000.ckpt",
        })
        model, model_cfg = load_hmr2(DEFAULT_CHECKPOINT)
        device = get_torch_device()
        model = model.to(device)
        if fp16:
            model = model.half()
        detector = YOLO(str(Path(CACHE_DIR_4DHUMANS) / detector))
        return (SimpleNamespace(human4d=model, model_cfg=model_cfg, detector=detector, fp16=fp16), )

```
