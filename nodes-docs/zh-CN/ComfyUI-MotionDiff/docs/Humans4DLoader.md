
# Documentation
- Class name: Humans4DLoader
- Category: MotionDiff
- Output node: False

Humans4DLoader节点旨在加载和准备4D人体模型，以便进行后续处理或分析。它负责下载必要的模型和配置，设置模型以供执行，并确保这些模型可以用于诸如运动分析或3D重建等任务。

# Input types
## Required
- detector
    - 指定用于识别图像中人体的检测器模型。检测器的选择可能会影响人体检测的准确性和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- fp16
    - 指示是否对模型使用半精度浮点格式（FP16），这可能会在兼容的硬件上提高性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- human4d_model
    - 输出是一个结构化对象，包含加载的4D人体模型、其配置和检测器，可以进行进一步处理。
    - Comfy dtype: HUMAN4D_MODEL
    - Python dtype: SimpleNamespace


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
