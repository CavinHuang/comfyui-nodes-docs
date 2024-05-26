# Documentation
- Class name: BatchUnsampler
- Category: tests
- Output node: False
- Repo Ref: https://github.com/ttulttul/ComfyUI-Iterative-Mixer

BatchUnsampler 类旨在逆向工程应用于一批潜在变量的噪声计划，从给定的潜在图像开始，逐步向后工作。它利用模型的噪声计划生成一系列逐渐去噪的潜在变量，这在理解模型的内部表示和噪声动态方面可能非常有用。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了用于取消采样操作的基础架构和噪声计划。它是生成去噪潜在变量序列的基础，对节点的功能至关重要。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- sampler_name
    - sampler_name 参数很重要，因为它决定了在取消采样过程中使用的采样方法类型。它影响生成的潜在变量的质量和特性，从而影响去噪序列的整体结果。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SAMPLERS]
    - Python dtype: str
- scheduler
    - scheduler 参数至关重要，因为它决定了在取消采样操作中应用的噪声级别的调度策略。它影响去噪潜在序列的平滑性和连贯性，这对于准确表示至关重要。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SCHEDULERS]
    - Python dtype: str
- steps
    - steps 参数很重要，因为它定义了用于取消采样潜在变量的中间步骤的数量。它直接影响去噪潜在序列的分辨率和粒度，影响节点捕捉噪声计划中细节的能力。
    - Comfy dtype: INT
    - Python dtype: int
- start_at_step
    - start_at_step 参数指定了取消采样开始的初始步骤。它设置了去噪序列的起点，对于控制生成的潜在变量的范围至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - end_at_step 参数标记了取消采样结束的最终步骤。它建立了去噪序列的终点，影响了潜在变量去噪的程度。
    - Comfy dtype: INT
    - Python dtype: int
- latent_image
    - latent_image 参数至关重要，因为它提供了取消采样开始的源潜在图像。它是生成整个潜在变量序列的基础，对节点的操作不可或缺。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
## Optional
- normalize
    - 当启用 normalize 参数时，会将生成的潜在变量调整为平均值为零，这对于某些下游应用可能是有益的。它修改了取消采样的输出，有可能增强去噪潜在变量的可比性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- latent_batch
    - latent_batch 输出包含去噪的潜在变量序列，代表了对原始潜在图像应用的噪声计划的逆向工程。它是 BatchUnsampler 操作的重要结果，提供了模型内部噪声动态的宝贵见解。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class BatchUnsampler:
    """
    Unsample a latent step by step back to the start of the noise schedule.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'steps': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 1, 'max': 10000}), 'latent_image': ('LATENT',), 'normalize': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('LATENT',)
    RETURN_NAMES = ('latent_batch',)
    FUNCTION = 'unsampler'
    CATEGORY = 'tests'

    @torch.no_grad()
    def unsampler(self, model, sampler_name, scheduler, steps, start_at_step, end_at_step, latent_image, normalize=False):
        """
        Generate a batch of latents representing each z[i] in the
        progressively noised sequence of latents stemming from the
        source latent_image, using the model's noising schedule (sigma)
        in reverse and applying normal noise at each step in the manner
        prescribed by the original latent diffusion paper.
        """
        latent = latent_image
        latent_image = latent['samples']
        sigmas = calc_sigmas(model, sampler_name, scheduler, steps, start_at_step, end_at_step)
        sigmas = sigmas.flip(0)
        z = generate_noised_latents(latent_image, sigmas, normalize=normalize)
        out = {'samples': z}
        return (out,)
```