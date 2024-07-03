
# Documentation
- Class name: LatentDuplicator
- Category: latent
- Output node: False

LatentDuplicator节点旨在将潜在图像复制指定的次数,从而生成同一图像的多个副本,便于进一步处理或分析。

# Input types
## Required
- latent_image
    - 需要复制的输入潜在图像。它作为基础图像,将根据指定的复制次数生成多个副本。
    - Comfy dtype: LATENT
    - Python dtype: clabc.Mapping[str, torch.Tensor]
- dup_times
    - 指定输入潜在图像需要复制的次数。这个计数决定了将生成多少个基础图像的副本。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - 输出包含复制后的潜在图像,这些图像被连接成单个张量,有效地增加了可用于后续操作的图像数量。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentDuplicator:
    """
    Duplicate each latent images and pipe through
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        """
        Input: copies you want to get
        """
        return {
            "required": {
                "latent_image": ("LATENT", ),
                "dup_times": ("INT", {
                    "default": 2,
                    "min": 1,
                    "max": 16,
                    "step": 1,
                }),
            },
        }

    RETURN_TYPES = ("LATENT", )
    # RETURN_NAMES = ("image_output_name",)

    FUNCTION = "run"

    OUTPUT_NODE = False

    CATEGORY = "latent"

    def run(self, latent_image: clabc.Mapping[str, torch.Tensor],
            dup_times: int):
        """
        对latent_image进行复制, 复制次数为dup_times。
        
        Args:
            latent_image (clabc.Mapping[str, torch.Tensor]): 输入的latent_image, 包含'samples'键。
            dup_times (int): 复制次数。
        
        Returns:
            Tuple[Dict[str, torch.Tensor]]: 返回包含samples的字典, samples是一个长度为(dup_times+1)的样本张量。
        
        """
        samples = latent_image['samples']

        sample_list = [samples] + [
            torch.clone(samples) for _ in range(dup_times - 1)
        ]

        print(
            f"LatentDuplicator: dup {dup_times} times,",
            f"return {len(sample_list)} images",
        )
        return ({
            'samples': torch.cat(sample_list),
        }, )

```
