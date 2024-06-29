---
tags:
- SAM
---

# SAM Embedding to Image
## Documentation
- Class name: `SAMEmbeddingToImage`
- Category: `Art Venture/Segmentation`
- Output node: `False`

The SAMEmbeddingToImage node is designed to convert SAM embeddings into visual representations, enabling the intuitive interpretation and manipulation of the embedded data. It abstracts the complex information contained within the embeddings into a more accessible image format.
## Input types
### Required
- **`embedding`**
    - The embedding input represents the SAM embedding to be transformed into an image. This embedding is crucial as it contains the encoded information that will be visualized as an image.
    - Comfy dtype: `SAM_EMBEDDING`
    - Python dtype: `np.ndarray`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image generated from the SAM embedding, allowing for the visualization and further processing of the encoded information.
    - Python dtype: `Tuple[torch.Tensor]`
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
