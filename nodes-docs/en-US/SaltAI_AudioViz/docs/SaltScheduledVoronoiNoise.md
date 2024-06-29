---
tags:
- Noise
- NoisePatterns
---

# Scheduled Voronoi Noise Generator
## Documentation
- Class name: `SaltScheduledVoronoiNoise`
- Category: `SALT/Scheduling/Image`
- Output node: `False`

The SaltScheduledVoronoiNoise node is designed to generate Voronoi noise-based visual patterns. It allows for the scheduling of various parameters such as scale, detail, and randomness over time, enabling dynamic and evolving visual effects tailored to audio or other time-varying inputs.
## Input types
### Required
- **`batch_size`**
    - Specifies the number of patterns to generate in one execution, allowing for batch processing of noise generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Determines the width of the generated noise pattern, affecting the spatial resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Sets the height of the generated noise pattern, impacting the vertical resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`distance_metric`**
    - Defines the metric used to calculate distances in the Voronoi diagram, influencing the shape and distribution of cells.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`x_schedule`**
    - A schedule for the x-axis positions, enabling dynamic movement or variation of the noise pattern over time.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`y_schedule`**
    - A schedule for the y-axis positions, allowing for vertical movement or variation of the noise pattern over time.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`scale_schedule`**
    - Controls the scale of the noise pattern at different times, enabling zoom in/out effects.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`detail_schedule`**
    - Adjusts the level of detail in the noise pattern over time, affecting the complexity and texture.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`randomness_schedule`**
    - Modifies the randomness of the noise pattern over time, allowing for changes in the pattern's unpredictability.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`seed_schedule`**
    - A schedule for the seed values, enabling the generation of different noise patterns at different times.
    - Comfy dtype: `LIST`
    - Python dtype: `List[int]`
- **`device`**
    - Specifies the computing device (CPU or GPU) where the noise generation process will be executed, affecting performance and capability.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The generated Voronoi noise patterns as a batch of images.
    - Python dtype: `torch.Tensor`
- **`batch_size`**
    - Comfy dtype: `INT`
    - The number of generated patterns, confirming the size of the batch processed.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduledVoronoiNoise:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_size": ("INT", {"min": 1, "max": 4096}),
                "width": ("INT", {"default": 64, "min": 64, "max": MAX_RESOLUTION}),
                "height": ("INT", {"default": 64, "min": 64, "max": MAX_RESOLUTION}),
            }, 
            "optional": {
                "distance_metric": (["euclidean", "manhattan", "chebyshev", "minkowski"],),
                "x_schedule": ("LIST",),
                "y_schedule": ("LIST",),
                "scale_schedule": ("LIST",),
                "detail_schedule": ("LIST",),
                "randomness_schedule": ("LIST",),
                "seed_schedule": ("LIST", ),
                "device": (["cuda", "cpu"],),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "INT")
    RETURN_NAMES = ("images", "batch_size")

    FUNCTION = "generate"
    CATEGORY = "SALT/Scheduling/Image"

    def generate(self, batch_size, width, height, distance_metric="euclidean", x_schedule=[0], y_schedule=[0], z_schedule=[0], scale_schedule=[1.0], detail_schedule=[100], randomness_schedule=[1], seed_schedule=[0], device="cuda"):
        voronoi = VoronoiNoise(width=width, height=height, scale=scale_schedule, detail=detail_schedule, seed=seed_schedule, 
                            X=x_schedule, Y=y_schedule, 
                            randomness=randomness_schedule, distance_metric=distance_metric, batch_size=batch_size, device=device)
        voronoi = voronoi.to(device)
        tensors = voronoi()
        return(tensors, batch_size)

```
