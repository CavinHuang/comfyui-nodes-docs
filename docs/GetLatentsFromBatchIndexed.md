
# Documentation
- Class name: GetLatentsFromBatchIndexed
- Category: KJNodes
- Output node: False

GetLatentsFromBatchIndexed节点旨在从给定的潜在变量批次中选择并返回特定的潜在变量。它便于提取潜在变量的子集以进行进一步处理或分析，是需要对潜在空间进行有针对性操作或检查的操作的重要组成部分。

# Input types
## Required
- latents
    - latents参数表示可供选择的潜在变量批次。它对确定可供选择的潜在变量范围至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- indexes
    - indexes参数指定要从批次中选择的潜在变量的索引。它在识别要提取和处理的潜在变量方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- latent
    - 输出是输入潜在变量批次的修改版本，仅包含指定索引处的潜在变量。
    - Comfy dtype: LATENT
    - Python dtype: Tuple[Dict[str, torch.Tensor]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GetLatentsFromBatchIndexed:
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "indexedlatentsfrombatch"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Selects and returns the latents at the specified indices as an latent batch.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "latents": ("LATENT",),
                 "indexes": ("STRING", {"default": "0, 1, 2", "multiline": True}),
        },
    } 
    
    def indexedlatentsfrombatch(self, latents, indexes):
        
        samples = latents.copy()
        latent_samples = samples["samples"] 

        # Parse the indexes string into a list of integers
        index_list = [int(index.strip()) for index in indexes.split(',')]
        
        # Convert list of indices to a PyTorch tensor
        indices_tensor = torch.tensor(index_list, dtype=torch.long)
        
        # Select the latents at the specified indices
        chosen_latents = latent_samples[indices_tensor]

        samples["samples"] = chosen_latents
        return (samples,)

```
