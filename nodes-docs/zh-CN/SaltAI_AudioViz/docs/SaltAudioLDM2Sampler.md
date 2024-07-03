
# Documentation
- Class name: SaltAudioLDM2Sampler
- Category: SALT/Audio/AudioLDM2
- Output node: False

SaltAudioLDM2Sampler节点利用AudioLDM2模型根据给定的提示生成音频波形，通过种子、步数和引导比例等参数对生成过程进行控制。该节点专门用于创建具有由正面和负面提示定义的特定特征的音频内容。

# Input types
## Required
- audioldm2_model
    - 指定用于音频生成的AudioLDM2模型，影响输出音频的质量和风格。
    - Comfy dtype: AUDIOLDM_MODEL
    - Python dtype: str
- seed
    - 确定音频生成的随机种子，实现可重复的输出结果。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 定义音频生成过程中要执行的步数，影响输出的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- guidance_scale
    - 控制提示对生成音频的影响程度，较高的值会导致输出更符合提示。
    - Comfy dtype: FLOAT
    - Python dtype: float
- audio_length_seconds
    - 设置生成音频的长度（以秒为单位），允许自定义输出时长。
    - Comfy dtype: FLOAT
    - Python dtype: float
- num_waveforms
    - 确定要生成的音频波形数量，允许从单个提示生成多个输出。
    - Comfy dtype: INT
    - Python dtype: int
- positive_prompt
    - 正面提示引导音频生成朝向所需的特征或主题。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - 负面提示引导音频生成远离某些特征或主题，以优化输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- audio
    - 基于提供的提示和参数，采样过程生成的音频波形。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioLDM2Sampler:  
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audioldm2_model": ("AUDIOLDM_MODEL",),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "steps": ("INT", {"default": 200, "min": 1, "max": 1000}),
                "guidance_scale": ("FLOAT", {"default": 3.5, "max": 12.0, "min": 1.0}),
                "audio_length_seconds": ("FLOAT", {"default": 10.0, "min": 1.0, "max": 20.0, "step": 0.1}),
                "num_waveforms": ("INT", {"default": 3, "min": 1}),
                "positive_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                "negative_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False})
            },
            "optional": {

            },
        }

    RETURN_TYPES = ("AUDIO", )
    RETURN_NAMES = ("audio", )

    FUNCTION = "sample"
    CATEGORY = "SALT/Audio/AudioLDM2"

    def sample(self, audioldm2_model, **kwargs):
        generator = torch.Generator("cuda").manual_seed(kwargs.get("seed", 0))
        steps = kwargs.get("steps", 200)

        def update_comfy_pbar(step, timestep, latents, **kwargs):
            comfy_pbar.update(1)

        comfy_pbar = ProgressBar(steps)

        audio = audioldm2_model(
            kwargs.get("positive_prompt", "The sound of a hammer hitting a wooden surface."),
            negative_prompt=kwargs.get("negative_prompt", "Low quality."),
            num_inference_steps=steps,
            guidance_scale=kwargs.get("guidance_scale", 3.5),
            audio_length_in_s=kwargs.get("audio_length_seconds", 10.0),
            num_waveforms_per_prompt=kwargs.get("num_waveforms", 3),
            generator=generator,
            output_type="np",
            callback=update_comfy_pbar
        ).audios

        wave_bytes = numpy2wav(audio[0])
        return (wave_bytes, )

```
