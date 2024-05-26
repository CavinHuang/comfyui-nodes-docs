# Documentation
- Class name: LatentBatchStatisticsPlot
- Category: tests
- Output node: False
- Repo Ref: https://github.com/ttulttul/ComfyUI-Iterative-Mixer

LatentBatchStatisticsPlot节点旨在分析一批潜在变量的统计属性。它执行全面的统计分析，以确定批次中每个潜在变量的正态性。该节点生成统计结果的可视化表示，提供对潜在变量的分布特征的洞察。这对于需要图形分析工具来理解底层数据模式的研究人员和数据科学家特别有用。

# Input types
## Required
- batch
    - ‘batch’参数对于节点的操作至关重要，因为它代表了要分析的潜在变量集合。这是一个关键输入，直接影响统计分析和生成的图表。该参数确保节点接收到正确的数据以执行其预定功能。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- plot_image
    - ‘plot_image’输出是由节点执行的统计分析的图形表示。它在图表中包含了潜在变量的p值、均值和标准差，提供了数据分布的可视化摘要。这个输出非常重要，因为它使用户能够快速掌握潜在批次的统计属性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LatentBatchStatisticsPlot:
    """
    Generate a plot of the statistics of a batch of latents for analysis.
    Outputs an image.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'batch': ('LATENT',)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('plot_image',)
    FUNCTION = 'statistics'
    CATEGORY = 'tests'

    @torch.no_grad()
    def statistics(self, batch):
        """
        Run a statistical test on each latent in a batch to see how
        close to normal each latent is.
        """
        from scipy import stats
        batch = batch['samples']
        batch_size = batch.shape[0]
        p_values = []
        means = []
        std_devs = []
        for i in trange(batch.shape[0]):
            tensor_1d = batch[i].flatten()
            numpy_array = tensor_1d.numpy()
            (_, p) = stats.shapiro(numpy_array)
            p_values.append(p)
            means.append(numpy_array.mean())
            std_devs.append(numpy_array.std())
        (fig, axs) = plt.subplots(3, 1, figsize=(10, 15))
        axs[0].plot(p_values, label='p-values', marker='o', linestyle='-')
        axs[0].set_title('Shapiro-Wilk Test P-Values')
        axs[0].set_xlabel('Batch Number')
        axs[0].set_ylabel('P-Value')
        axs[0].axhline(y=0.05, color='r', linestyle='--', label='Normal Threshold')
        axs[0].legend()
        axs[1].plot(means, marker='o', linestyle='-')
        axs[1].set_title('Mean of Each Batch Latent')
        axs[1].set_xlabel('Batch Number')
        axs[1].set_ylabel('Mean')
        axs[2].plot(std_devs, marker='o', linestyle='-')
        axs[2].set_title('Standard Deviation of Each Batch Latent')
        axs[2].set_xlabel('Batch Number')
        axs[2].set_ylabel('Standard Deviation')
        plt.tight_layout()
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        pil_image = Image.open(buf)
        image_tensor = pil2tensor(pil_image)
        batch_output = image_tensor.unsqueeze(0)
        return batch_output
```