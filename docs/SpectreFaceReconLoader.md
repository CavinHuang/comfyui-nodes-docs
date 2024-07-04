
# Documentation
- Class name: SpectreFaceReconLoader
- Category: MotionDiff
- Output node: False

SpectreFaceReconLoader节点旨在初始化并加载Spectre模型以及用于人脸识别任务的面部跟踪器。它通过下载必要的模型并设置配置参数来准备模型以供后续操作，确保系统准备就绪，可以在图像或视频流中进行面部跟踪和识别。

# Input types
## Required
- fp16
    - 决定是否以半精度（FP16）格式加载模型。这可以减少内存使用，并可能在兼容的硬件上提高性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- spectre_model
    - 返回一个包含已初始化的面部跟踪器和Spectre模型的元组，可用于人脸识别任务。
    - Comfy dtype: SPECTRE_MODEL
    - Python dtype: Tuple[FaceTracker, SPECTRE]


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
