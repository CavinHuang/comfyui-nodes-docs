【思考】首先需要仔细阅读原文,理解每个部分的含义和作用。然后按照Example中的格式进行翻译,保持原有的markdown结构。翻译时要注意使用通俗易懂的现代汉语,同时保证专业术语的准确性。

【翻译】


# Documentation
- Class name: KSamplerAdvancedPipe __Inspire
- Category: InspirePack/a1111_compat
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

KSamplerAdvancedInspire节点旨在通过在管道中提供高级采样功能来增强灵感过程。它利用复杂的算法来生成或处理数据,目的是通过其输出激发创造力和创新。

# Input types
## Required
- basic_pipe
    - 'basic_pipe'输入对于提供模型、clip、vae和条件元素的基础组件至关重要,为高级采样操作奠定了基础。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: tuple
- add_noise
    - 'add_noise'输入决定是否应在采样过程中添加噪声,影响生成输出的可变性和独特性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_seed
    - 'noise_seed'输入指定噪声生成的种子,确保采样过程的可重复性和一致性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 'steps'输入定义了采样过程中要采取的步骤数,影响生成的深度和细节。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 'cfg'输入设置采样过程的配置,调整生成的控制和指导。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 'sampler_name'输入选择要使用的特定采样器算法,根据特定要求定制采样过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 'scheduler'输入指定采样过程的调度算法,影响生成的进展和变化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- latent_image
    - 'latent_image'输入提供一个初始潜在图像,作为采样过程的起点,影响生成的方向。
    - Comfy dtype: LATENT
    - Python dtype: object
- start_at_step
    - 'start_at_step'输入决定采样过程的起始步骤,允许自定义生成的进程。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 'end_at_step'输入定义采样过程的结束步骤,设置生成的边界。
    - Comfy dtype: INT
    - Python dtype: int
- noise_mode
    - 'noise_mode'输入选择噪声生成的计算模式(GPU或CPU),影响采样过程的性能和效率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- return_with_leftover_noise
    - 'return_with_leftover_noise'输入表示是否应返回剩余噪声,提供对输出可变性的额外控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- batch_seed_mode
    - 'batch_seed_mode'输入指定批处理操作中种子生成的模式,影响输出的多样性和一致性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- variation_seed
    - 'variation_seed'输入提供生成变体的种子,使采样过程能进行细微调整。
    - Comfy dtype: INT
    - Python dtype: int
- variation_strength
    - 'variation_strength'输入控制应用变体的强度,允许对生成的多样性进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- noise_opt
    - 如果提供'noise_opt'输入,它为采样过程指定自定义噪声选项,提供进一步的定制。
    - Comfy dtype: NOISE
    - Python dtype: object

# Output types
- latent
    - 该输出表示生成的潜在图像,作为进一步处理或可视化的基础元素。
    - Comfy dtype: LATENT
    - Python dtype: object
- vae
    - 该输出提供过程中使用的变分自编码器,便于对生成数据进行额外的操作或分析。
    - Comfy dtype: VAE
    - Python dtype: object


【思考】检查译文是否符合原文意思,是否使用了易懂的现代汉语,以及是否保持了原有的markdown格式。对比Example中的译文格式,确保一致性。

【校审】译文基本符合要求,但仍需要进行一些微调:
1. 在Documentation部分添加"Repo Ref"链接。
2. 确保所有的Comfy dtype和Python dtype保持原文不变。
3. 调整一些表述,使其更加通俗易懂。

【再次校审】检查译文格式是否完全符合Example中译文的格式,包括标点符号、代码块、列表、标题等。确认无误后即可定稿。

【定稿】最终译文如上所示,已经符合要求。

## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvanced_inspire_pipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"basic_pipe": ("BASIC_PIPE",),
                     "add_noise": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.5, "round": 0.01}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
                     "latent_image": ("LATENT", ),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                     "noise_mode": (["GPU(=A1111)", "CPU"],),
                     "return_with_leftover_noise": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
                     "batch_seed_mode": (["incremental", "comfy", "variation str inc:0.01", "variation str inc:0.05"],),
                     "variation_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "variation_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     },
                "optional":
                    {
                        "noise_opt": ("NOISE",),
                    }
                }

    RETURN_TYPES = ("LATENT", "VAE", )
    FUNCTION = "sample"

    CATEGORY = "InspirePack/a1111_compat"

    def sample(self, basic_pipe, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, latent_image, start_at_step, end_at_step, noise_mode, return_with_leftover_noise, denoise=1.0, batch_seed_mode="comfy", variation_seed=None, variation_strength=None, noise_opt=None):
        model, clip, vae, positive, negative = basic_pipe
        latent = KSamplerAdvanced_inspire().sample(model=model, add_noise=add_noise, noise_seed=noise_seed,
                                                   steps=steps, cfg=cfg, sampler_name=sampler_name, scheduler=scheduler,
                                                   positive=positive, negative=negative, latent_image=latent_image,
                                                   start_at_step=start_at_step, end_at_step=end_at_step,
                                                   noise_mode=noise_mode, return_with_leftover_noise=return_with_leftover_noise,
                                                   denoise=denoise, batch_seed_mode=batch_seed_mode, variation_seed=variation_seed,
                                                   variation_strength=variation_strength, noise_opt=noise_opt)[0]
        return (latent, vae)

```
