package tables

import (
	"database/sql"
	"fmt"

	"github.com/pkg/errors"
)

func init() {
	MigrationClient.AddMigration(Up_20220704101843, Down_20220704101843)
}

func Up_20220704101843(tx *sql.Tx) error {
	fmt.Println("Updating software_id column in software_cve table...")

	var min int
	var max int

	const selectStmt = `
SELECT COALESCE(MIN(cve.id), 0) AS min_id, COALESCE(MAX(cve.id), 0) as max_id 
FROM software_cve AS cve
WHERE cve.software_id IS NULL;`
	if err := tx.QueryRow(selectStmt).Scan(&min, &max); err != nil {
		return errors.Wrap(err, "selecting min,max id")
	}

	// Update in batches
	const batchSize = 500
	const updateStmt = `
UPDATE software_cve AS cve 
INNER JOIN software_cpe AS cpe ON cve.cpe_id = cpe.id
SET cve.software_id = cpe.software_id 
WHERE cve.software_id IS NULL AND cve.id >= ? AND cve.id < ?;`

	if min == 0 && max == 0 {
		fmt.Println("Nothing to update ...")
	} else {
		fmt.Printf("Updating aprox %d records... \n", max-min)
	}

	start := min
	for {
		end := start + batchSize
		if end >= max {
			end = max + 1
		}

		_, err := tx.Exec(updateStmt, start, end)
		if err != nil {
			return errors.Wrapf(err, "updating software_cve")
		}

		start += batchSize
		if start >= max {
			break
		}
	}

	fmt.Println("Done updating 'software_id'...")
	fmt.Println("Adding index to 'software_id'...")

	const indexStmt = `
ALTER TABLE software_cve ADD INDEX software_cve_software_id (software_id), ALGORITHM=INPLACE, LOCK=NONE;`
	_, err := tx.Exec(indexStmt)
	if err != nil {
		return errors.Wrapf(err, "adding index to software_id on software_cve table")
	}

	fmt.Println("Done adding index to 'software_id'...")

	return nil
}

func Down_20220704101843(tx *sql.Tx) error {
	return nil
}
