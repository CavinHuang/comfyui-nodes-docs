---
tags:
- SAM
---

# Get SAM Embedding
## Documentation
- Class name: `GetSAMEmbedding`
- Category: `Art Venture/Segmentation`
- Output node: `False`

This node is designed to generate a SAM embedding from an image using a specified SAM model. It adjusts the model to the appropriate device based on the execution mode and processes the image to produce its embedding, which is crucial for further image manipulation or analysis tasks.
## Input types
### Required
- **`sam_model`**
    - The SAM model to be used for generating the embedding. It determines the architecture and weights for processing the image.
    - Comfy dtype: `AV_SAM_MODEL`
    - Python dtype: `torch.nn.Module`
- **`image`**
    - The image to be processed. This is the input image from which the SAM embedding will be generated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`device_mode`**
    - Specifies the device (AUTO, Prefer GPU, CPU) on which the SAM model should run. This affects the performance and efficiency of the embedding generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sam_embedding`**
    - Comfy dtype: `SAM_EMBEDDING`
    - The generated SAM embedding of the input image. This embedding is used for further processing or analysis within the image manipulation pipeline.
    - Python dtype: `np.ndarray`
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
