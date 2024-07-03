
# Documentation
- Class name: `MaskGrid N KSamplers Advanced`
- Category: `Bmad/experimental`
- Output node: `False`
- Repo Ref: https://github.com/Suzie1/ComfyUI_Bmad_nodes

此节点专门用于在网格格式中应用高级采样技术来生成或修改潜在空间。它利用多个采样器和掩码策略来创建或改变潜在变量，实现网格内区域的复杂操作，如分叉和合并。该节点的功能对于需要精确控制生成图像或模式中特征空间分布的任务至关重要。

# Input types
## Required
- model
    - 指定用于采样的模型。它对于定义在采样过程中将使用的生成模型架构至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- add_noise
    - 指示是否应在采样过程中添加噪声。此参数可以显著影响生成的潜在变量的多样性和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- noise_seed
    - 设置噪声生成的种子，确保在向采样过程添加噪声时的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 定义采样过程中要执行的步骤数。此参数控制采样操作的深度，影响生成的潜在变量的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 指定生成模型的条件因子，影响采样过程中条件的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 确定要使用的特定采样器算法。不同的采样器可以对生成的潜在变量产生不同的效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择采样过程的调度器，可以影响采样操作的进程和结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 提供正面条件输入，以引导采样朝向所需的属性或特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 提供负面条件输入，以引导采样远离某些属性或特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- latent_image
    - 表示通过采样和掩码操作要修改的初始潜在图像。此参数是节点复杂操作的起点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- start_at_step
    - 定义采样过程的起始步骤，允许对采样进程进行更多控制。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 定义采样过程的结束步骤，为采样操作提供边界。
    - Comfy dtype: INT
    - Python dtype: int
- return_with_leftover_noise
    - 指示输出是否应包括采样过程中的剩余噪声。这对于进一步的操作或分析可能有用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- mask
    - 指定要应用于潜在图像的掩码，实现网格内的目标修改。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- rows
    - 确定网格格式中的行数。此参数影响潜在变量在网格内的空间组织。
    - Comfy dtype: INT
    - Python dtype: int
- columns
    - 确定网格格式中的列数。此参数影响潜在变量在网格内的空间组织。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - 指定操作模式，如在采样之前或之后分叉。这个选择可以显著影响操作的结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- latent
    - 应用高级采样和掩码技术后修改的潜在图像。此输出对于依赖于潜在变量内空间操纵特征的下游任务非常重要。
    - Comfy dtype: LATENT
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskGridNKSamplersAdvanced(nodes.KSamplerAdvanced):
    fork_before_sampling = {
        "Sample then Fork": False,
        "Fork then Sample": True
    }
    fork_options = list(fork_before_sampling.keys())

    @classmethod
    def INPUT_TYPES(s):
        types = super().INPUT_TYPES()
        types["required"]["mask"] = ("IMAGE",)
        types["required"]["rows"] = ("INT", {"default": 1, "min": 1, "max": 16})
        types["required"]["columns"] = ("INT", {"default": 3, "min": 1, "max": 16})
        types["required"]["mode"] = (s.fork_options, {"default": s.fork_options[0]})
        return types

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "gen_batch"
    CATEGORY = "Bmad/experimental"

    def gen_batch(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative,
                  latent_image, start_at_step, end_at_step, return_with_leftover_noise,
                  mask, rows, columns, mode, denoise=1.0):

        # setup sizes
        _, _, latent_height_as_img, latent_width_as_img = latent_image['samples'].size()
        latent_width_as_img *= 8
        latent_height_as_img *= 8
        _, mask_height, mask_width, _ = mask.size()

        # existing nodes required for the operation
        set_mask_node = nodes.SetLatentNoiseMask()

        latents = []

        if not self.fork_before_sampling[mode]:
            # FORK AFTER SAMPLING

            # prepare mask
            mask = RepeatIntoGridImage().repeat_into_grid(mask, columns, rows)[0]
            new_mask = torch.zeros((latent_height_as_img, latent_width_as_img))
            new_mask[:, :] = mask[0, :, :, 0]

            # prepare latent w/ mask and send to ksampler
            sampled_latent = set_mask_node.set_mask(samples=latent_image, mask=new_mask)[0]
            sampled_latent = \
            super().sample(model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative,
                           sampled_latent, start_at_step, end_at_step, return_with_leftover_noise, denoise)[0][
                'samples']

            # adjust mask sizes for latent space
            mask_height //= 8
            mask_width //= 8

            # fork and copy regions from original latent
            for r in range(rows):
                for c in range(columns):
                    x2 = x1 = mask_width * c
                    x2 += mask_width
                    y2 = y1 = mask_height * r
                    y2 += mask_height
                    new_latent = latent_image['samples'].clone()
                    new_latent[0, :, y1:y2, x1:x2] = sampled_latent[0, :, y1:y2, x1:x2]
                    latents.append(new_latent)  # add new latent
        else:
            # FORK BEFORE SAMPLING
            for r in range(rows):
                for c in range(columns):
                    # copy source mask to a new empty mask
                    new_mask = torch.zeros((latent_height_as_img, latent_width_as_img))
                    new_mask[mask_height * r:mask_height * (r + 1), mask_width * c:mask_width * (c + 1)] = mask[0, :, :,
                                                                                                           0]

                    # prepare latent w/ mask and send to ksampler
                    new_latent = set_mask_node.set_mask(samples=latent_image.copy(), mask=new_mask)[0]
                    new_latent = \
                    super().sample(model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive,
                                   negative,
                                   new_latent, start_at_step, end_at_step, return_with_leftover_noise, denoise)[0][
                        'samples']

                    latents.append(new_latent)  # add new latent

        return ({"samples": torch.cat([batch for batch in latents], dim=0)},)

```
