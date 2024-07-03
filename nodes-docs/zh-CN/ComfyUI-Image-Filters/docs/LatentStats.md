
# Documentation
- Class name: LatentStats
- Category: utils
- Output node: True

LatentStats 节点旨在分析并报告神经网络模型中潜在表示的统计数据。它计算并打印潜在空间不同组成部分的各种统计指标，如均值、标准差、最小值和最大值，从而提供对正在处理的数据特征的深入洞察。

# Input types
## Required
- latent
    - 'latent' 参数代表待分析的潜在表示。它对节点的操作至关重要，因为它直接影响统计计算和最终输出的结果。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- stats
    - Comfy dtype: STRING
    - 一个总结潜在表示统计分析的字符串，包括批次大小、维度以及每个组成部分的统计数据。
    - Python dtype: str
- c0_mean
    - Comfy dtype: FLOAT
    - 潜在表示中第一个组成部分的平均值。
    - Python dtype: float
- c1_mean
    - Comfy dtype: FLOAT
    - 潜在表示中第二个组成部分的平均值。
    - Python dtype: float
- c2_mean
    - Comfy dtype: FLOAT
    - 潜在表示中第三个组成部分的平均值。
    - Python dtype: float
- c3_mean
    - Comfy dtype: FLOAT
    - 潜在表示中第四个组成部分的平均值。
    - Python dtype: float


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
