---
tags:
- Noise
- NoisePatterns
---

# Scheduled Perline Power Fractal Generator
## Documentation
- Class name: `SaltScheduledPerlinPowerFractalNoise`
- Category: `SALT/Scheduling/Image`
- Output node: `False`

This node is designed to generate complex, visually appealing noise patterns by leveraging the Perlin noise algorithm. It intricately schedules and modifies Perlin noise parameters over time or across frames to produce dynamic, fractal-like visual effects that can be used in audio visualization or other graphical applications.
## Input types
### Required
- **`batch_size`**
    - Specifies the number of noise patterns to generate in a single batch, affecting the node's output volume and parallel processing efficiency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Determines the width of the generated noise pattern, directly influencing the spatial resolution and aspect ratio of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Sets the height of the generated noise pattern, impacting the spatial resolution and aspect ratio of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`scale_schedule`**
    - A schedule that adjusts the scale of the noise pattern across different frames or instances, allowing for dynamic changes in the visual complexity and detail of the noise.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`octaves_schedule`**
    - Controls the number of octaves used in the noise generation process, affecting the level of detail and the overall complexity of the resulting pattern.
    - Comfy dtype: `LIST`
    - Python dtype: `List[int]`
- **`persistence_schedule`**
    - Adjusts the persistence parameter across frames, influencing the amplitude of the noise octaves and thereby the visual contrast of the pattern.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`lacunarity_schedule`**
    - Modifies the lacunarity parameter over time, which affects the frequency of noise details and contributes to the fractal-like appearance of the output.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`exponent_schedule`**
    - A schedule for the exponent parameter that influences the intensity and contrast of the noise pattern, allowing for nuanced adjustments to the visual output.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`seed_schedule`**
    - Determines the seed values for noise generation, ensuring variability and uniqueness in the patterns produced across different instances or frames.
    - Comfy dtype: `LIST`
    - Python dtype: `List[int]`
- **`clamp_min_schedule`**
    - Sets the minimum clamp value for the noise output, enabling control over the lower bounds of the noise intensity and ensuring consistency in the pattern's visual range.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`clamp_max_schedule`**
    - Defines the maximum clamp value for the noise output, allowing for control over the upper bounds of the noise intensity and ensuring consistency in the pattern's visual range.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`device`**
    - Specifies the computing device (CPU or GPU) on which the noise generation process is executed, affecting performance and efficiency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The generated noise pattern as a tensor, ready for further processing or visualization.
    - Python dtype: `torch.Tensor`
- **`batch_size`**
    - Comfy dtype: `INT`
    - The number of noise patterns generated, corresponding to the input batch size.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduledPerlinPowerFractalNoise:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_size": ("INT", {"min": 1, "max": 4096}),
                "width": ("INT", {"default": 256, "min": 64, "max": MAX_RESOLUTION}),
                "height": ("INT", {"default": 256, "min": 64, "max": MAX_RESOLUTION}),
            },
            "optional": {
                "scale_schedule": ("LIST",),
                "octaves_schedule": ("LIST",),
                "persistence_schedule": ("LIST",),
                "lacunarity_schedule": ("LIST",),
                "exponent_schedule": ("LIST",),
                "seed_schedule": ("LIST",),
                "clamp_min_schedule": ("LIST",),
                "clamp_max_schedule": ("LIST",),
                "device": (["cuda", "cpu"],),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "INT")
    RETURN_NAMES = ("images", "batch_size")

    FUNCTION = "generate"
    CATEGORY = "SALT/Scheduling/Image"

    def generate(self, batch_size, width, height, scale_schedule=[1.0], octaves_schedule=[4], persistence_schedule=[0.5], lacunarity_schedule=[2.0], exponent_schedule=[1.0], seed_schedule=[0], clamp_min_schedule=[-0.5], clamp_max_schedule=[1.5], device="cuda"):
        octaves_schedule = [int(octave) for octave in octaves_schedule]
        ppfn = PerlinPowerFractalNoise(
            width, height, 
            scale=scale_schedule, 
            octaves=octaves_schedule, 
            persistence=persistence_schedule, 
            lacunarity=lacunarity_schedule, 
            exponent=exponent_schedule, 
            seeds=seed_schedule, 
            clamp_min=clamp_min_schedule, 
            clamp_max=clamp_max_schedule, 
            batch_size=batch_size, 
            device=device
        )
        noise_tensor = ppfn.forward()
        return (noise_tensor, batch_size)

```
