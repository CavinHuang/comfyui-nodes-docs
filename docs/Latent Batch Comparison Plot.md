# Documentation
- Class name: LatentBatchComparator
- Category: test
- Output node: False
- Repo Ref: https://github.com/ttulttul/ComfyUI-Iterative-Mixer

该节点旨在通过生成可视化表示来比较两批潜在变量，展示它们之间的差异。它使用余弦相似度矩阵来量化潜在向量之间的差异，提供对它们在潜在空间中相对位置的清晰直观理解。

# Input types
## Required
- latent_batch_1
    - 此参数代表要比较的第一个潜在变量批次。它在节点的操作中扮演着关键角色，因为它构成了比较的一方。此批次中的潜在变量预期以一种允许与第二个批次进行有意义比较的方式进行结构化。
    - Comfy dtype: "LATENT"
    - Python dtype: Dict[str, torch.Tensor]
- latent_batch_2
    - 此参数保存要与第一批进行比较的第二批潜在变量。它的重要性与第一批相当，因为它完成了比较分析。此批次中的潜在变量的结构和格式应与第一批中的潜在变量兼容，以进行准确的比较。
    - Comfy dtype: "LATENT"
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- plot_image
    - 该节点的输出是一张表示两批潜在变量之间余弦相似度矩阵的图像。它作为一个可视化工具，可以一目了然地理解潜在变量之间的相似度或差异程度。
    - Comfy dtype: "IMAGE"
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LatentBatchComparator:
    """
    Generate plots showing the differences between two batches of latents.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latent_batch_1': ('LATENT',), 'latent_batch_2': ('LATENT',)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('plot_image',)
    CATEGORY = 'test'
    FUNCTION = 'plot_latent_differences'

    def plot_latent_differences(self, latent_batch_1, latent_batch_2):
        """
        Generate a plot of the differences between two batches of latents.
        """
        import torch.nn.functional as F
        (tensor1, tensor2) = [x['samples'] for x in (latent_batch_1, latent_batch_2)]
        if tensor1.shape != tensor2.shape:
            raise ValueError('Latent batches must have the same shape: %s != %s' % (tensor1.shape, tensor2.shape))
        (B, C, H, W) = tensor1.shape
        tensor1_flat = tensor1.view(B, -1)
        tensor2_flat = tensor2.view(B, -1)
        tensor1_flat_expanded = tensor1_flat.unsqueeze(1)
        cosine_similarities_vectorized = F.cosine_similarity(tensor1_flat_expanded, tensor2_flat.unsqueeze(0), dim=2)
        plt.figure(figsize=(15, 10))
        plt.imshow(cosine_similarities_vectorized, cmap='viridis')
        plt.title('Cosine Similarity Matrix')
        plt.xlabel('Batch 1 Index')
        plt.ylabel('Batch 2 Index')
        plt.tight_layout()
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        pil_image = Image.open(buf)
        image_tensor = pil2tensor(pil_image)
        batch_output = image_tensor.unsqueeze(0)
        return batch_output
```