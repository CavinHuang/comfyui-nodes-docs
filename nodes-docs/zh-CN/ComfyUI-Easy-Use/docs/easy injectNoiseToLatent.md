
# Documentation
- Class name: easy injectNoiseToLatent
- Category: EasyUse/Latent
- Output node: False

injectNoiseToLatent节点旨在通过注入噪声来修改潜在表示，从而从给定输入生成多样化的输出。它支持在注入前对噪声进行平均或缩放、对结果噪声潜在表示进行归一化，以及基于掩码有条件地应用噪声，从而实现对噪声注入过程的精细控制。

# Input types
## Required
- strength
    - 指定要注入到潜在空间的噪声强度，影响修改的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- normalize
    - 决定是否对带噪声的潜在表示进行归一化，影响结果潜在值的分布。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- average
    - 控制是否对原始和带噪声的潜在表示进行平均，混合输入和噪声以获得可能更平滑的结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- pipe_to_noise
    - 可选的管道输入，可提供噪声设置和样本，为噪声提供替代来源。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- image_to_latent
    - 可选的图像输入，如果提供，将被转换为潜在表示以进行噪声注入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- latent
    - 将添加噪声的主要潜在输入。如果未提供，将尝试使用替代来源。
    - Comfy dtype: LATENT
    - Python dtype: dict
- noise
    - 要注入到潜在表示中的噪声。可以直接提供或从pipe_to_noise输入中获取。
    - Comfy dtype: LATENT
    - Python dtype: dict
- mask
    - 可选的掩码，可用于选择性地将噪声注入到潜在空间的部分区域，允许局部修改。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mix_randn_amount
    - 指定要混合到带噪声潜在表示中的随机噪声量，引入额外的随机性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 噪声注入后的修改潜在表示，根据应用的噪声和设置可能呈现不同的变化。
    - Comfy dtype: LATENT
    - Python dtype: dict


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class injectNoiseToLatent:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "strength": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 200.0, "step": 0.0001}),
            "normalize": ("BOOLEAN", {"default": False}),
            "average": ("BOOLEAN", {"default": False}),
        },
            "optional": {
                "pipe_to_noise": ("PIPE_LINE",),
                "image_to_latent": ("IMAGE",),
                "latent": ("LATENT",),
                "noise": ("LATENT",),
                "mask": ("MASK",),
                "mix_randn_amount": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000.0, "step": 0.001}),
                # "seed": ("INT", {"default": 123, "min": 0, "max": 0xffffffffffffffff, "step": 1}),
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "inject"
    CATEGORY = "EasyUse/Latent"

    def inject(self,strength, normalize, average, pipe_to_noise=None, noise=None, image_to_latent=None, latent=None, mix_randn_amount=0, mask=None):

        vae = pipe_to_noise["vae"] if pipe_to_noise is not None else pipe_to_noise["vae"]
        batch_size = pipe_to_noise["loader_settings"]["batch_size"] if pipe_to_noise is not None and "batch_size" in pipe_to_noise["loader_settings"] else 1
        if noise is None and pipe_to_noise is not None:
            noise = pipe_to_noise["samples"]
        elif noise is None:
            raise Exception("InjectNoiseToLatent: No noise provided")

        if image_to_latent is not None and vae is not None:
            samples = {"samples": vae.encode(image_to_latent[:, :, :, :3])}
            latents = RepeatLatentBatch().repeat(samples, batch_size)[0]
        elif latent is not None:
            latents = latent
        else:
            raise Exception("InjectNoiseToLatent: No input latent provided")

        samples = latents.copy()
        if latents["samples"].shape != noise["samples"].shape:
            raise ValueError("InjectNoiseToLatent: Latent and noise must have the same shape")
        if average:
            noised = (samples["samples"].clone() + noise["samples"].clone()) / 2
        else:
            noised = samples["samples"].clone() + noise["samples"].clone() * strength
        if normalize:
            noised = noised / noised.std()
        if mask is not None:
            mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])),
                                                   size=(noised.shape[2], noised.shape[3]), mode="bilinear")
            mask = mask.expand((-1, noised.shape[1], -1, -1))
            if mask.shape[0] < noised.shape[0]:
                mask = mask.repeat((noised.shape[0] - 1) // mask.shape[0] + 1, 1, 1, 1)[:noised.shape[0]]
            noised = mask * noised + (1 - mask) * latents["samples"]
        if mix_randn_amount > 0:
            # if seed is not None:
            #     torch.manual_seed(seed)
            rand_noise = torch.randn_like(noised)
            noised = ((1 - mix_randn_amount) * noised + mix_randn_amount *
                      rand_noise) / ((mix_randn_amount ** 2 + (1 - mix_randn_amount) ** 2) ** 0.5)
        samples["samples"] = noised
        return (samples,)

```
