# Discovering Hidden Sector Relationships Among S&P 500 Companies

**ISYE 6740 — Computational Data Analytics · Georgia Tech · Fall 2025**

A text-analytics and unsupervised-learning study of whether the official GICS sector taxonomy can be reproduced — and challenged — from public text alone. I build text-based representations of all 497 unique S&P 500 companies from their Wikipedia articles, then test how well interpretable models recover sector structure.

## Key results

- **85.9%** cross-validated accuracy predicting GICS sectors with a Linear SVM on TF-IDF features — competitive with far heavier transformer baselines, while staying fully interpretable.
- **Spectral clustering** gives the best unsupervised fit (**ARI 0.439, NMI 0.626**), capturing ~**63%** of GICS structure while surfacing cross-sector relationships.
- Uniformly low silhouette scores across all cluster counts suggest companies live in a *continuous* operational space rather than discrete buckets — motivating **alternative factor-based portfolio construction**.

## Approach

- **Data:** scraped the S&P 500 constituent table and retrieved full Wikipedia articles via `wikipediaapi` (502 entries → 497 unique companies after filtering missing articles and duplicate share classes).
- **Features:** TF-IDF with unigrams + bigrams, sublinear term-frequency scaling (`sublinear_tf` added +6.0% CV accuracy), 5,000-term vocabulary.
- **Dimensionality reduction:** Truncated SVD (works directly on sparse matrices, no centering), k = 300 components.
- **Models:** K-Means and Spectral clustering (unsupervised); Logistic Regression and Linear SVM with 5-fold CV (supervised).

[📄 Read the full paper (PDF)](/projects/sp500-sector-text-analytics.pdf)
