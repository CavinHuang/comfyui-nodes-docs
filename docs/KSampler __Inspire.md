
# Documentation
- Class name: KSampler __Inspire
- Category: InspirePack/a1111_compat
- Output node: False

KSampler __Inspire节点旨在通过从模型中采样来促进创意内容的生成，其方式受特定输入的启发。它抽象了采样算法的复杂性，提供了一个接口，可以根据正面和负面提示、风格指导和其他参数生成新颖的输出。

# Input types
## Required
- model
    - 指定要从中采样的模型，作为生成输出的基础。
    - Comfy dtype: MODEL
    - Python dtype: str
- seed
    - 设置随机数生成的初始种子，确保采样过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 确定在采样过程中执行的步骤数，影响生成输出的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置无条件引导比例，影响生成过程中条件的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 选择要使用的特定采样算法，根据所需特征调整生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择用于控制采样过程的调度器，进一步定制输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 指定正面条件，引导生成朝向所需的属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 定义生成应避免的负面条件，引导输出远离不需要的属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 提供一个初始潜在图像，通过采样过程进行修改或增强。
    - Comfy dtype: LATENT
    - Python dtype: str
- denoise
    - 调整生成过程中应用的去噪级别，影响输出的清晰度和连贯性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mode
    - 选择噪声应用模式，影响生成输出的纹理和细节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_seed_mode
    - 确定批处理过程中种子生成和应用的模式，影响输出的可变性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- variation_seed
    - 指定用于引入变化的种子，为生成过程增加额外的随机性。
    - Comfy dtype: INT
    - Python dtype: int
- variation_strength
    - 控制由变化种子引入的变化强度，影响输出的多样性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 产生生成内容的潜在表示，封装了受输入条件影响的所需属性。
    - Comfy dtype: LATENT
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KSampler_inspire:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
                     "positive": ("CONDITIONING", ),
                     "negative": ("CONDITIONING", ),
                     "latent_image": ("LATENT", ),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "noise_mode": (["GPU(=A1111)", "CPU"],),
                     "batch_seed_mode": (["incremental", "comfy", "variation str inc:0.01", "variation str inc:0.05"],),
                     "variation_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "variation_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     }
                }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "InspirePack/a1111_compat"

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, batch_seed_mode="comfy", variation_seed=None, variation_strength=None):
        return common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, incremental_seed_mode=batch_seed_mode, variation_seed=variation_seed, variation_strength=variation_strength)

```
