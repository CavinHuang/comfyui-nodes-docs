---
tags:
- Latent
---

# Latent Stats
## Documentation
- Class name: `LatentStats`
- Category: `utils`
- Output node: `True`

The LatentStats node is designed to analyze and report statistics of latent representations in a neural network model. It calculates and prints various statistical measures such as mean, standard deviation, minimum, and maximum values for different components of the latent space, providing insights into the characteristics of the data being processed.
## Input types
### Required
- **`latent`**
    - The 'latent' parameter represents the latent representations to be analyzed. It is crucial for the node's operation as it directly influences the statistical calculations and the resulting output.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`stats`**
    - Comfy dtype: `STRING`
    - A string summarizing the statistical analysis of the latent representations, including batch size, dimensions, and statistics for each component.
    - Python dtype: `str`
- **`c0_mean`**
    - Comfy dtype: `FLOAT`
    - The mean value of the first component in the latent representations.
    - Python dtype: `float`
- **`c1_mean`**
    - Comfy dtype: `FLOAT`
    - The mean value of the second component in the latent representations.
    - Python dtype: `float`
- **`c2_mean`**
    - Comfy dtype: `FLOAT`
    - The mean value of the third component in the latent representations.
    - Python dtype: `float`
- **`c3_mean`**
    - Comfy dtype: `FLOAT`
    - The mean value of the fourth component in the latent representations.
    - Python dtype: `float`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentStats:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"latent": ("LATENT", ),}}

    RETURN_TYPES = ("STRING", "FLOAT", "FLOAT", "FLOAT", "FLOAT")
    RETURN_NAMES = ("stats", "c0_mean", "c1_mean", "c2_mean", "c3_mean")
    FUNCTION = "notify"
    OUTPUT_NODE = True

    CATEGORY = "utils"

    def notify(self, latent):
        latents = latent["samples"]
        width, height = latents.size(3), latents.size(2)
        
        text = ["",]
        text[0] = f"batch size: {latents.size(0)}"
        text.append(f"width: {width} ({width * 8})")
        text.append(f"height: {height} ({height * 8})")
        
        cmean = [0,0,0,0]
        for i in range(4):
            minimum = torch.min(latents[:,i,:,:]).item()
            maximum = torch.max(latents[:,i,:,:]).item()
            std_dev, mean = torch.std_mean(latents[:,i,:,:], dim=None)
            cmean[i] = mean
            
            text.append(f"c{i} mean: {mean:.1f} std_dev: {std_dev:.1f} min: {minimum:.1f} max: {maximum:.1f}")
        
        
        printtext = "\033[36mLatent Stats:\033[m"
        for t in text:
            printtext += "\n    " + t
        
        returntext = ""
        for i in range(len(text)):
            if i > 0:
                returntext += "\n"
            returntext += text[i]
        
        print(printtext)
        return (returntext, cmean[0], cmean[1], cmean[2], cmean[3])

```
