# Content and architecture review

The public pages use confirmed responsibilities, dates and attribution. The following items remain deliberately outside stronger public claims.

## Employment and resume

- Data Engineer Intern, Vertoz Limited: June 2025 - August 2025.
- Associate Software Engineer, Vertoz Limited: August 2025 - present.
- ConnectReseller is a product within Vertoz. Internship work covered multiple products.
- The public PDF is a source-derived copy with these dates and only the approved professional contact details. It does not publish the phone number from the attachment. Review this copy before release; the uploaded original remains untouched.

## Measurements

| Claim                            | State                                                   | Required context                                                                                                                                     |
| -------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Approximately 90 to 10 minutes   | Pending; excluded from production                       | Comparable input, environment and timing boundary. Comparable runs would imply 9x speedup / 88.9% less elapsed time.                                 |
| 10x daily processing improvement | Separate pending resume claim; excluded from production | Measurement method and relationship, if any, to the runtime example.                                                                                 |
| MedLeaf 82% model accuracy       | Visible as project-reported                             | Dataset provenance, evaluation split, model definition and per-class behavior remain undocumented. No independent or clinical validation is claimed. |

## Draft diagrams

All six diagrams have status `draft` in the typed content. `npm run build` excludes them and the review route. `npm run build:review` makes them available in an explicitly noindex review build. Approval of a site release does not by itself approve these diagrams.

| Diagram                  | Confirm before approval                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Service responsibilities | Which services publish notifications? Which requests pass through the gateway? Confirm actual boundaries; do not infer independent deployment or shared databases.                   |
| Batch processing         | Do Parquet, PySpark, JDBC tuning and Vertica describe the same optimized job? Confirm legacy/replacement job boundaries. Keep Superset and Java/Redis work separate unless verified. |
| Registrar normalization  | Which operations are configuration-driven? Where is an EPP-shaped versus provider-specific contract used? Confirm routing versus adapter responsibilities.                           |
| Event ingestion          | Confirm every connection, enrichment location, HTTP completion, Kafka/PySpark boundary and Parquet destination. Identify which parts belonged to Spoutro.                            |
| Account context          | Confirm transition/restoration ordering and that the sanitized sketch reveals no private permission rules or token details.                                                          |
| MedLeaf                  | Confirm training versus inference boundaries and preprocessing parity. EC2 is a deployment context, not an inferred extra inference stage.                                           |

The review diagrams are responsibility sketches, not verified production topology. Correct a sketch before changing its status to approved. No private endpoints, tokens, provider credentials, actual schema names or employer source code are included.

## Stronger case-study evidence

The pages describe the owner's documented work and label proposed improvements as future work. Benchmark configurations, production throughput, uptime, team size, independent service deployment and registrar-wide dynamic capabilities have not been supplied and must not be invented.

## Discovery sources

- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): separate search-crawler and training-crawler controls. The repository's existing GPTBot preference is preserved.
- [llms.txt proposal](https://llmstxt.org/): supplementary guidance. It does not replace semantic HTML, canonical pages or normal indexing controls, and is not a promise of AI citation.
