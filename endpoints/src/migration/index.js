import sequelize from '../db';
import civilities from './scripts/civility';

const migrations = [civilities];

const main = async () => {
    const startDate = new Date();
    console.log(`---- Migration started at: ${startDate} ----`);

    try {
        await Promise.all(
            migrations.map(async (e) => {
                const { name, migrate } = e();
                const migrationStartDate = new Date();
                console.log(`[${name}]: ---- Migration started at: ${migrationStartDate} ----`);
                try {
                    await migrate(sequelize);
                } catch (e) {
                    console.log(`[ERROR] error while migrating ${name}`);
                    throw e;
                }
                const migrationEndDate = new Date();
                console.log(
                    `[${name}]: ---- Migration ended at: ${migrationEndDate}, took ${
                        migrationEndDate.getTime() - migrationStartDate.getTime()
                    } Milliseconds ----`
                );
            })
        );
    } catch (e) {
        console.log(`[ERROR] error while executing migrations`);
        throw e;
    }

    const endDate = new Date();
    console.log(
        `---- Migration ended successfully at: ${endDate}, took ${
            endDate.getTime() - startDate.getTime()
        } Milliseconds ----`
    );
};
main();
