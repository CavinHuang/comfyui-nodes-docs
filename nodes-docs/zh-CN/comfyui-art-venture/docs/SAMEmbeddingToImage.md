
# Documentation
- Class name: SAMEmbeddingToImage
- Category: Art Venture/Segmentation
- Output node: False

SAMEmbeddingToImage节点用于将SAM嵌入转换为可视化表示，从而实现对嵌入数据的直观解释和操作。它将嵌入中包含的复杂信息抽象为更易于理解的图像格式。

# Input types
## Required
- embedding
    - embedding参数代表需要转换为图像的SAM嵌入。这个嵌入至关重要，因为它包含了将被可视化为图像的编码信息。
    - Comfy dtype: SAM_EMBEDDING
    - Python dtype: np.ndarray

# Output types
- image
    - 输出是从SAM嵌入生成的图像，允许对编码信息进行可视化和进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: Tuple[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SAMEmbeddingToImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "embedding": ("SAM_EMBEDDING",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Segmentation"
    FUNCTION = "sam_embedding_to_noise_image"

    def sam_embedding_to_noise_image(self, embedding: np.ndarray):
        # Flatten the array to a 1D array
        flat_arr = embedding.flatten()
        # Convert the 1D array to bytes
        bytes_arr = flat_arr.astype(np.float32).tobytes()
        # Convert bytes to RGBA PIL Image
        size = (embedding.shape[1] * 4, int(embedding.shape[2] * embedding.shape[3] / 4))

        img = Image.frombytes("RGBA", size, bytes_arr)

        return (pil2tensor(img),)

```
