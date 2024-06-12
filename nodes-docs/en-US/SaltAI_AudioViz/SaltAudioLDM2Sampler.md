---
tags:
- Audio
---

# AudioLDM2 Sampler
## Documentation
- Class name: `SaltAudioLDM2Sampler`
- Category: `SALT/Audio/AudioLDM2`
- Output node: `False`

The SaltAudioLDM2Sampler node utilizes the AudioLDM2 model for generating audio waveforms based on given prompts, offering control over the generation process through parameters like seed, steps, and guidance scale. It's tailored for creating audio content with specific characteristics defined by positive and negative prompts.
## Input types
### Required
- **`audioldm2_model`**
    - Specifies the AudioLDM2 model to be used for audio generation, affecting the quality and style of the output audio.
    - Comfy dtype: `AUDIOLDM_MODEL`
    - Python dtype: `str`
- **`seed`**
    - Determines the randomness seed for audio generation, enabling reproducible outputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the audio generation process, impacting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`guidance_scale`**
    - Controls the influence of the prompts on the generated audio, with higher values leading to more prompt-conforming outputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`audio_length_seconds`**
    - Sets the length of the generated audio in seconds, allowing for customization of the output duration.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`num_waveforms`**
    - Determines the number of audio waveforms to generate, enabling multiple outputs from a single prompt.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`positive_prompt`**
    - The positive prompt guides the audio generation towards desired characteristics or themes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - The negative prompt steers the audio generation away from certain characteristics or themes, refining the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The generated audio waveform as a result of the sampling process, based on the provided prompts and parameters.
    - Python dtype: `bytes`
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
