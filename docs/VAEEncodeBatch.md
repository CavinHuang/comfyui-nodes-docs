
# Documentation
- Class name: VAEEncodeBatch
- Category: Bmad
- Output node: False

VAEEncodeBatch节点旨在使用指定的VAE模型对图像进行批量处理，将其编码为潜在空间表示。它允许同时编码多个图像，优化了处理效率和可扩展性。

# Input types
## Required
- inputs_len
    - 指定要在批次中编码的图像数量。这个参数控制图像的迭代和后续编码过程，影响节点的执行和输出潜在表示的大小。
    - Comfy dtype: INT
    - Python dtype: int
- vae
    - 用于编码图像的VAE模型。这个参数对于决定如何将图像转换为潜在空间表示至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Output types
- latent
    - 批量图像的编码潜在空间表示。这个输出封装了输入图像转换成适合进一步处理或分析的格式。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VAEEncodeBatch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "inputs_len": ("INT", {"default": 3, "min": 2, "max": 32, "step": 1}),
            "vae": ("VAE",)
        }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "encode"
    CATEGORY = "Bmad"

    def encode(self, inputs_len, vae, **kwargs):
        vae_encoder = nodes.VAEEncode()

        def get_latent(input_name):
            pixels = kwargs[input_name]
            pixels = vae_encoder.vae_encode_crop_pixels(pixels)
            return vae.encode(pixels[:, :, :, :3])

        latent = get_latent("image_1")
        for r in range(1, inputs_len):
            latent = torch.cat([latent, get_latent(f"image_{r + 1}")], dim=0)

        return ({"samples": latent},)

```
