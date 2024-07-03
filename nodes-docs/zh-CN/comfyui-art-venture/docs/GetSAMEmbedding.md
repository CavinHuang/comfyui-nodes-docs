
# Documentation
- Class name: GetSAMEmbedding
- Category: Art Venture/Segmentation
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在使用指定的SAM模型从图像生成SAM嵌入。它会根据执行模式将模型调整到适当的设备上，并处理图像以生成其嵌入，这对于进一步的图像操作或分析任务至关重要。

# Input types
## Required
- sam_model
    - 用于生成嵌入的SAM模型。它决定了处理图像的架构和权重。
    - Comfy dtype: AV_SAM_MODEL
    - Python dtype: torch.nn.Module
- image
    - 要处理的图像。这是将生成SAM嵌入的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- device_mode
    - 指定SAM模型应运行的设备（AUTO、Prefer GPU、CPU）。这会影响嵌入生成的性能和效率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- sam_embedding
    - 输入图像生成的SAM嵌入。这个嵌入用于图像操作流程中的进一步处理或分析。
    - Comfy dtype: SAM_EMBEDDING
    - Python dtype: np.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GetSAMEmbedding:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sam_model": ("AV_SAM_MODEL",),
                "image": ("IMAGE",),
            },
            "optional": {"device_mode": (["AUTO", "Prefer GPU", "CPU"],)},
        }

    RETURN_TYPES = ("SAM_EMBEDDING",)
    CATEGORY = "Art Venture/Segmentation"
    FUNCTION = "get_sam_embedding"

    def get_sam_embedding(self, image, sam_model, device_mode="AUTO"):
        device = gpu if device_mode != "CPU" else cpu
        sam_model.to(device)

        try:
            predictor = SamPredictor(sam_model)
            image = tensor2pil(image)
            image = image.convert("RGB")
            image = np.array(image)
            predictor.set_image(image, "RGB")
            embedding = predictor.get_image_embedding().cpu().numpy()

            return (embedding,)
        finally:
            if device_mode == "AUTO":
                sam_model.to(cpu)

```
