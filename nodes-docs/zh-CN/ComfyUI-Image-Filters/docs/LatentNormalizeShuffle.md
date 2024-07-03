
# Documentation
- Class name: LatentNormalizeShuffle
- Category: latent/filters
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentNormalizeShuffle节点旨在对图像的潜在表示进行归一化和随机重排，为后续的处理或生成任务做好准备。它将潜在向量调整为标准分布并重新排列，以引入可变性，从而优化输入以实现多样化的图像生成结果。

# Input types
## Required
- latents
    - latents输入代表需要进行归一化和随机重排的图像潜在表示。这个过程确保数据被标准化和随机化，这对于实现多样化和高质量的图像生成结果至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- flatten
    - flatten输入指定是否应该将潜在表示作为归一化过程的一部分进行扁平化，这会影响后续操作的数据结构。
    - Comfy dtype: INT
    - Python dtype: bool
- normalize
    - normalize输入决定潜在表示是否进行归一化，调整其尺度和分布以实现一致的处理。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- shuffle
    - shuffle输入表示是否应该对潜在表示进行随机重排，为数据集引入随机性和可变性，以增强生成的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- latent
    - 输出的latent是经过归一化和随机重排的潜在表示，已为后续的图像生成任务做好准备。这确保输入数据被优化处理，以产生多样化和高质量的图像。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentNormalizeShuffle:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents": ("LATENT", ),
                "flatten": ("INT", {"default": 0, "min": 0, "max": 16}),
                "normalize": ("BOOLEAN", {"default": True}),
                "shuffle": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "batch_normalize"

    CATEGORY = "latent/filters"

    def batch_normalize(self, latents, flatten, normalize, shuffle):
        latents_copy = copy.deepcopy(latents)
        t = latents_copy["samples"] # [B x C x H x W]
        
        if flatten > 0:
            d = flatten * 2 + 1
            channels = t.shape[1]
            kernel = gaussian_kernel(d, 1, device=t.device).repeat(channels, 1, 1).unsqueeze(1)
            t_blurred = torch.nn.functional.conv2d(t, kernel, padding='same', groups=channels)
            t = t - t_blurred
        
        if normalize:
            for b in range(t.shape[0]):
                for c in range(4):
                    t_sd, t_mean = torch.std_mean(t[b,c])
                    t[b,c] = (t[b,c] - t_mean) / t_sd
        
        if shuffle:
            t_shuffle = []
            for i in (1,2,3,0):
                t_shuffle.append(t[:,i])
            t = torch.stack(t_shuffle, dim=1)
        
        latents_copy["samples"] = t
        return (latents_copy,)

```
